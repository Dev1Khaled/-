/**
 /**
 * smart_kh AI Debug Collector (agent-friendly)
 * Developed by KH
 *
 * Captures:
 * 1) Console logs
 * 2) Network requests (fetch + XHR)
 * 3) UI interactions (semantic events)
 */

(function () {
  "use strict";

  // Prevent double initialization
  if (window.__SMART_KH_AI__) return;

  // ==========================================================================
  // Configuration
  // ==========================================================================
  const CONFIG = {
    reportEndpoint: "/__smart_kh__/logs",

    bufferSize: {
      console: 500,
      network: 200,
      ui: 500,
    },

    reportInterval: 2000,

    sensitiveFields: [
      "password",
      "token",
      "secret",
      "key",
      "authorization",
      "cookie",
      "session",
    ],

    maxBodyLength: 10240,
    uiInputMaxLen: 200,
    uiTextMaxLen: 80,
    scrollThrottleMs: 500,
  };

  // ==========================================================================
  // Storage
  // ==========================================================================
  const store = {
    consoleLogs: [],
    networkRequests: [],
    uiEvents: [],
    lastScrollTime: 0,
  };

  // ==========================================================================
  // SMART_KH CORE (AI LAYER - BASE)
  // ==========================================================================
  const smart_kh = {
    name: "smart_kh",
    owner: "KH",
    version: "1.0",

    analyze(store) {
      const insights = [];

      const errors = store.consoleLogs.filter(e => e.level === "ERROR");
      const slow = store.networkRequests.filter(r => r.duration > 3000);

      if (errors.length > 3) {
        insights.push({
          type: "error_pattern",
          message: "توجد أخطاء متكررة في النظام",
          severity: "high"
        });
      }

      if (slow.length > 2) {
        insights.push({
          type: "performance_issue",
          message: "بطء في طلبات الشبكة",
          severity: "medium"
        });
      }

      return insights;
    }
  };

  // ==========================================================================
  // Utility Functions
  // ==========================================================================
  function sanitizeValue(value, depth = 0) {
    if (depth > 5) return "[Max Depth]";
    if (value === null || value === undefined) return value;

    if (typeof value === "string") {
      return value.length > 1000
        ? value.slice(0, 1000) + "...[truncated]"
        : value;
    }

    if (typeof value !== "object") return value;

    if (Array.isArray(value)) {
      return value.slice(0, 100).map(v => sanitizeValue(v, depth + 1));
    }

    const out = {};
    for (let k in value) {
      if (!Object.prototype.hasOwnProperty.call(value, k)) continue;

      const isSensitive = CONFIG.sensitiveFields.some(f =>
        k.toLowerCase().includes(f)
      );

      out[k] = isSensitive
        ? "[REDACTED]"
        : sanitizeValue(value[k], depth + 1);
    }

    return out;
  }
// ==========================================================================
  // SMART_KH Utilities Layer
  // ==========================================================================

  function formatArg(arg) {
    try {
      if (arg instanceof Error) {
        return {
          type: "Error",
          message: arg.message,
          stack: arg.stack
        };
      }

      if (typeof arg === "object") {
        return sanitizeValue(arg);
      }

      return String(arg);
    } catch (e) {
      return "[Unserializable]";
    }
  }

  function formatArgs(args) {
    const result = [];
    for (let i = 0; i < args.length; i++) {
      result.push(formatArg(args[i]));
    }
    return result;
  }

  function pruneBuffer(buffer, maxSize) {
    if (buffer.length > maxSize) {
      buffer.splice(0, buffer.length - maxSize);
    }
  }

  function tryParseJson(str) {
    if (typeof str !== "string") return str;

    try {
      return JSON.parse(str);
    } catch {
      return str;
    }
  }

  // ==========================================================================
  // SMART_KH UI Helpers
  // ==========================================================================

  function shouldIgnoreTarget(target) {
    try {
      if (!target || !(target instanceof Element)) return false;
      return !!target.closest(".smart-kh-ignore");
    } catch {
      return false;
    }
  }

  function compactText(text, maxLen) {
    try {
      const clean = (text || "").trim().replace(/\s+/g, " ");
      if (!clean) return "";
      return clean.length > maxLen
        ? clean.slice(0, maxLen) + "…"
        : clean;
    } catch {
      return "";
    }
  }

  // ==========================================================================
  // SMART_KH UI Intelligence Layer
  // ==========================================================================

  function elText(el) {
    try {
      const text = el.innerText || el.textContent || "";
      return compactText(text, CONFIG.uiTextMaxLen);
    } catch {
      return "";
    }
  }

  function describeElement(el) {
    if (!el || !(el instanceof Element)) return null;

    const getAttr = (name) => el.getAttribute(name);

    const tag = el.tagName ? el.tagName.toLowerCase() : "unknown";
    const id = el.id || null;
    const name = getAttr("name") || null;
    const role = getAttr("role") || null;
    const ariaLabel = getAttr("aria-label") || null;

    const dataLoc = getAttr("data-loc") || null;
    const testId =
      getAttr("data-testid") ||
      getAttr("data-test-id") ||
      getAttr("data-test") ||
      null;

    const type = tag === "input" ? (getAttr("type") || "text") : null;
    const href = tag === "a" ? getAttr("href") || null : null;

    // smart selector hint (for AI understanding UI structure)
    let selectorHint = "unknown";

    if (testId) {
      selectorHint = `[data-testid="${testId}"]`;
    } else if (dataLoc) {
      selectorHint = `[data-loc="${dataLoc}"]`;
    } else if (id) {
      selectorHint = `#${id}`;
    } else {
      selectorHint = tag;
    }

    return {
      tag,
      id,
      name,
      type,
      role,
      ariaLabel,
      testId,
      dataLoc,
      href,
      text: elText(el),

      // AI-friendly metadata
      selectorHint,
      importance:
        role === "button" || tag === "button"
          ? "high"
          : tag === "input"
          ? "medium"
          : "low"
    };
  }
// ==========================================================================
  // SMART_KH Privacy Layer
  // ==========================================================================

  function isSensitiveField(el) {
    if (!el || !(el instanceof Element)) return false;

    const tag = el.tagName ? el.tagName.toLowerCase() : "";
    if (tag !== "input" && tag !== "textarea") return false;

    const type = (el.getAttribute("type") || "").toLowerCase();

    // password field is always sensitive
    if (type === "password") return true;

    const name = (el.getAttribute("name") || "").toLowerCase();
    const id = (el.id || "").toLowerCase();

    return CONFIG.sensitiveFields.some(field =>
      name.includes(field) || id.includes(field)
    );
  }

  function getInputValueSafe(el) {
    if (!el || !(el instanceof Element)) return null;

    const tag = el.tagName ? el.tagName.toLowerCase() : "";
    if (!["input", "textarea", "select"].includes(tag)) return null;

    let value = "";

    try {
      value = el.value != null ? String(el.value) : "";
    } catch {
      value = "";
    }

    // SMART_KH: protect sensitive data
    if (isSensitiveField(el)) {
      return {
        masked: true,
        length: value.length,
        type: "sensitive_input"
      };
    }

    // truncate large input
    if (value.length > CONFIG.uiInputMaxLen) {
      value = value.slice(0, CONFIG.uiInputMaxLen) + "…";
    }

    return value;
  }
  // ==========================================================================
  // SMART_KH UI Event Engine
  // ==========================================================================

  function logUiEvent(kind, payload) {
    const entry = {
      timestamp: Date.now(),
      kind,
      url: location.href,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },

      // sanitized payload for privacy
      payload: sanitizeValue(payload),
    };

    store.uiEvents.push(entry);
    pruneBuffer(store.uiEvents, CONFIG.bufferSize.ui);

    // optional: AI hook (future intelligence layer)
    if (typeof smart_kh !== "undefined" && smart_kh.analyze) {
      smart_kh.analyze(store);
    }
  }

  function installUiEventListeners() {
    // =========================
    // CLICK EVENTS
    // =========================
    document.addEventListener(
      "click",
      function (e) {
        const t = e.target;

        if (shouldIgnoreTarget(t)) return;

        logUiEvent("click", {
          target: describeElement(t),
          position: {
            x: e.clientX,
            y: e.clientY
          }
        });
      },
      true
    );
// ==========================================================================
  // SMART_KH Form Intelligence Layer
  // ==========================================================================

  // =========================
  // CHANGE (input commit)
  // =========================
  document.addEventListener(
    "change",
    function (e) {
      const t = e.target;
      if (shouldIgnoreTarget(t)) return;

      logUiEvent("change", {
        target: describeElement(t),
        value: getInputValueSafe(t),
        meta: {
          interaction: "commit",
          sensitive: isSensitiveField(t)
        }
      });
    },
    true
  );

  // =========================
  // FOCUS IN
  // =========================
  document.addEventListener(
    "focusin",
    function (e) {
      const t = e.target;
      if (shouldIgnoreTarget(t)) return;

      logUiEvent("focusin", {
        target: describeElement(t),
        meta: {
          event: "user_enter_field"
        }
      });
    },
    true
  );

  // =========================
  // FOCUS OUT
  // =========================
  document.addEventListener(
    "focusout",
    function (e) {
      const t = e.target;
      if (shouldIgnoreTarget(t)) return;

      logUiEvent("focusout", {
        target: describeElement(t),

        // safe value only (already masked internally if sensitive)
        value: getInputValueSafe(t),

        meta: {
          event: "user_leave_field",
          sensitive: isSensitiveField(t)
        }
      });
    },
    true
  );
  // ==========================================================================
  // SMART_KH Interaction Final Layer
  // ==========================================================================

  // =========================
  // KEYBOARD SHORTCUTS (Enter / Escape)
  // =========================
  document.addEventListener(
    "keydown",
    function (e) {
      if (e.key !== "Enter" && e.key !== "Escape") return;

      const t = e.target;
      if (shouldIgnoreTarget(t)) return;

      logUiEvent("keydown", {
        key: e.key,
        target: describeElement(t),
        meta: {
          action:
            e.key === "Enter"
              ? "form_submit_trigger"
              : "modal_close_trigger"
        }
      });
    },
    true
  );

  // =========================
  // FORM SUBMISSION
  // =========================
  document.addEventListener(
    "submit",
    function (e) {
      const t = e.target;
      if (shouldIgnoreTarget(t)) return;

      logUiEvent("submit", {
        target: describeElement(t),

        meta: {
          event: "form_submit",
          timestamp: Date.now()
        }
      });
    },
    true
  );
 // ==========================================================================
  // SMART_KH Scroll Intelligence Layer
  // ==========================================================================

  window.addEventListener(
    "scroll",
    function () {
      const now = Date.now();

      // throttle to reduce noise
      if (now - store.lastScrollTime < CONFIG.scrollThrottleMs) return;
      store.lastScrollTime = now;

      const scrollY = window.scrollY || window.pageYOffset;
      const scrollX = window.scrollX || window.pageXOffset;

      const docHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;

      // calculate scroll depth (0 → 100%)
      const scrollDepth = docHeight
        ? Math.round((scrollY / (docHeight - viewportHeight)) * 100)
        : 0;

      logUiEvent("scroll", {
        position: {
          x: scrollX,
          y: scrollY
        },

        metrics: {
          documentHeight: docHeight,
          viewportHeight: viewportHeight,
          scrollDepth: scrollDepth
        },

        meta: {
          behavior: "user_scroll_activity"
        }
      });
    },
    { passive: true }
  );
// ==========================================================================
  // SMART_KH Navigation Intelligence Layer (SPA Tracking)
  // ==========================================================================

  function nav(reason) {
    logUiEvent("navigate", {
      reason,
      url: location.href,
      path: location.pathname,
      meta: {
        type: "spa_navigation"
      }
    });
  }

  // =========================
  // history.pushState override
  // =========================
  const origPush = history.pushState;
  history.pushState = function (...args) {
    origPush.apply(this, args);
    nav("pushState");
  };

  // =========================
  // history.replaceState override
  // =========================
  const origReplace = history.replaceState;
  history.replaceState = function (...args) {
    origReplace.apply(this, args);
    nav("replaceState");
  };

  // =========================
  // BACK / FORWARD navigation
  // =========================
  window.addEventListener("popstate", function () {
    nav("popstate");
  });

  // =========================
  // HASH navigation (# routes)
  // =========================
  window.addEventListener("hashchange", function () {
    nav("hashchange");
  });
 // ==========================================================================
  // SMART_KH Console Intelligence Layer
  // ==========================================================================

  const originalConsole = {
    log: console.log.bind(console),
    debug: console.debug.bind(console),
    info: console.info.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console),
  };

  ["log", "debug", "info", "warn", "error"].forEach(function (method) {
    console[method] = function (...args) {
      const entry = {
        timestamp: Date.now(),
        level: method.toUpperCase(),

        // structured args for AI processing
        args: formatArgs(args),

        // only capture stack on errors
        stack: method === "error" ? new Error().stack : null,

        meta: {
          source: "console_intercept"
        }
      };

      store.consoleLogs.push(entry);
      pruneBuffer(store.consoleLogs, CONFIG.bufferSize.console);

      // optional AI hook (future analysis layer)
      if (typeof smart_kh !== "undefined" && smart_kh.analyze) {
        smart_kh.analyze(store);
      }

      // keep original behavior
      originalConsole[method].apply(console, args);
    };
  });
 // ==========================================================================
  // SMART_KH Error Intelligence Layer
  // ==========================================================================

  window.addEventListener("error", function (event) {
    const errorEntry = {
      timestamp: Date.now(),
      level: "ERROR",

      args: [
        {
          type: "UncaughtError",
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          stack: event.error ? event.error.stack : null
        }
      ],

      stack: event.error ? event.error.stack : null,

      meta: {
        source: "runtime_error",
        severity: "high"
      }
    };

    store.consoleLogs.push(errorEntry);
    pruneBuffer(store.consoleLogs, CONFIG.bufferSize.console);

    // UI error signal (important for AI correlation)
    logUiEvent("error", {
      message: event.message,
      location: {
        file: event.filename,
        line: event.lineno,
        column: event.colno
      },

      meta: {
        type: "js_runtime_error",
        severity: "high"
      }
    });

    // optional AI hook
    if (typeof smart_kh !== "undefined" && smart_kh.analyze) {
      smart_kh.analyze(store);
    }
  });

 // ==========================================================================
  // SMART_KH Async Error Intelligence (Unhandled Promises)
  // ==========================================================================

  window.addEventListener("unhandledrejection", function (event) {
    const reason = event.reason;

    const message =
      reason && reason.message ? reason.message : String(reason);

    const stack =
      reason && reason.stack ? reason.stack : null;

    const errorEntry = {
      timestamp: Date.now(),
      level: "ERROR",

      args: [
        {
          type: "UnhandledRejection",
          message: message,
          stack: stack
        }
      ],

      stack: stack,

      meta: {
        source: "promise_rejection",
        severity: "high",
        async: true
      }
    };

    store.consoleLogs.push(errorEntry);
    pruneBuffer(store.consoleLogs, CONFIG.bufferSize.console);

    // link with UI system (important for behavior tracing)
    logUiEvent("unhandledrejection", {
      message: message,

      meta: {
        type: "async_error",
        severity: "high"
      }
    });

    // optional AI hook
    if (typeof smart_kh !== "undefined" && smart_kh.analyze) {
      smart_kh.analyze(store);
    }
  });
  // ==========================================================================
  // SMART_KH Network Intelligence (Fetch Interception)
  // ==========================================================================

  const originalFetch = window.fetch.bind(window);

  window.fetch = function (input, init = {}) {
    const startTime = Date.now();

    // normalize URL
    const url =
      typeof input === "string"
        ? input
        : (input && (input.url || input.href || String(input))) || "";

    const method =
      init.method || (input && input.method) || "GET";

    // ignore internal smart_kh requests
    if (url.startsWith("/__smart_kh__/")) {
      return originalFetch(input, init);
    }

    // safely parse headers
    let requestHeaders = {};
    try {
      if (init.headers) {
        requestHeaders = Object.fromEntries(
          new Headers(init.headers).entries()
        );
      }
    } catch {
      requestHeaders = { _parseError: true };
    }

    const entry = {
      timestamp: startTime,
      type: "fetch",

      method: method.toUpperCase(),
      url: url,

      request: {
        headers: sanitizeValue(requestHeaders),
        body: init.body
          ? sanitizeValue(tryParseJson(init.body))
          : null
      },

      response: null,
      duration: null,
      error: null,

      meta: {
        source: "network_fetch"
      }
    };

    return originalFetch(input, init)
      .then(function (response) {
        entry.duration = Date.now() - startTime;

        const contentType =
          (response.headers.get("content-type") || "").toLowerCase();

        const contentLength =
          response.headers.get("content-length");

        entry.response = {
          status: response.status,
          statusText: response.statusText,

          headers: sanitizeValue(
            Object.fromEntries(response.headers.entries())
          ),

          body: null
        };

        // 🔴 detect failure (AI signal)
        if (response.status >= 400) {
          logUiEvent("network_error", {
            kind: "fetch",
            method: entry.method,
            url: entry.url,

            status: response.status,
            statusText: response.statusText,

            meta: {
              severity: "medium",
              type: "http_error"
            }
          });
        }

        // skip streaming responses
        const isStreaming =
          contentType.includes("text/event-stream") ||
          contentType.includes("application/stream") ||
          contentType.includes("application/x-ndjson");

        if (isStreaming) {
          entry.response.body = "[Streaming response]";
          store.networkRequests.push(entry);
          pruneBuffer(store.networkRequests, CONFIG.bufferSize.network);
          return response;
        }

        // skip large responses
        if (
          contentLength &&
          parseInt(contentLength, 10) > CONFIG.maxBodyLength
        ) {
          entry.response.body =
            "[Too large: " + contentLength + " bytes]";
          store.networkRequests.push(entry);
          pruneBuffer(store.networkRequests, CONFIG.bufferSize.network);
          return response;
        }

        // skip binary
        const isBinary =
          contentType.includes("image/") ||
          contentType.includes("video/") ||
          contentType.includes("audio/") ||
          contentType.includes("application/octet-stream") ||
          contentType.includes("application/pdf") ||
          contentType.includes("application/zip");

        if (isBinary) {
          entry.response.body = "[Binary: " + contentType + "]";
          store.networkRequests.push(entry);
          pruneBuffer(store.networkRequests, CONFIG.bufferSize.network);
          return response;
        }

        // read body async (non-blocking)
        const cloned = response.clone();

        cloned
          .text()
          .then(function (text) {
            if (text.length <= CONFIG.maxBodyLength) {
              entry.response.body = sanitizeValue(
                tryParseJson(text)
              );
            } else {
              entry.response.body =
                text.slice(0, CONFIG.maxBodyLength) + "...[truncated]";
            }
          })
          .catch(function () {
            entry.response.body = "[unreadable]";
          })
          .finally(function () {
            store.networkRequests.push(entry);
            pruneBuffer(
              store.networkRequests,
              CONFIG.bufferSize.network
            );

            // optional AI hook
            if (
              typeof smart_kh !== "undefined" &&
              smart_kh.analyze
            ) {
              smart_kh.analyze(store);
            }
          });

        return response;
      })
      .catch(function (error) {
        entry.duration = Date.now() - startTime;

        entry.error = {
          message: error.message,
          stack: error.stack
        };

        store.networkRequests.push(entry);
        pruneBuffer(store.networkRequests, CONFIG.bufferSize.network);

        logUiEvent("network_error", {
          kind: "fetch",
          method: entry.method,
          url: entry.url,
          message: error.message,

          meta: {
            severity: "high",
            type: "network_failure"
          }
        });

        // AI hook
        if (typeof smart_kh !== "undefined" && smart_kh.analyze) {
          smart_kh.analyze(store);
        }

        throw error;
      });
       
// ==========================================================================
        // SMART_KH Response Handling Intelligence
        // ==========================================================================

        const isStreaming =
          contentType.includes("text/event-stream") ||
          contentType.includes("application/stream") ||
          contentType.includes("application/x-ndjson");

        if (isStreaming) {
          entry.response.body = "[Streaming]";
          store.networkRequests.push(entry);
          pruneBuffer(store.networkRequests, CONFIG.bufferSize.network);
          return response;
        }

        const isTooLarge =
          contentLength &&
          parseInt(contentLength, 10) > CONFIG.maxBodyLength;

        if (isTooLarge) {
          entry.response.body = "[Too large: " + contentLength + " bytes]";
          store.networkRequests.push(entry);
          pruneBuffer(store.networkRequests, CONFIG.bufferSize.network);
          return response;
        }

        const isBinary =
          contentType.includes("image/") ||
          contentType.includes("video/") ||
          contentType.includes("audio/") ||
          contentType.includes("application/octet-stream") ||
          contentType.includes("application/pdf") ||
          contentType.includes("application/zip");

        if (isBinary) {
          entry.response.body = "[Binary: " + contentType + "]";
          store.networkRequests.push(entry);
          pruneBuffer(store.networkRequests, CONFIG.bufferSize.network);
          return response;
        }

        // non-blocking read
        const clonedResponse = response.clone();

        clonedResponse
          .text()
          .then(function (text) {
            if (text.length <= CONFIG.maxBodyLength) {
              entry.response.body = sanitizeValue(
                tryParseJson(text)
              );
            } else {
              entry.response.body =
                text.slice(0, CONFIG.maxBodyLength) + "...[truncated]";
            }
          })
          .catch(function () {
            entry.response.body = "[Unreadable]";
          })
          .finally(function () {
            store.networkRequests.push(entry);
            pruneBuffer(store.networkRequests, CONFIG.bufferSize.network);

            // AI hook
            if (typeof smart_kh !== "undefined" && smart_kh.analyze) {
              smart_kh.analyze(store);
            }
          });

        return response;
      }
      .catch(function (error) {
        entry.duration = Date.now() - startTime;

        entry.error = {
          message: error.message,
          stack: error.stack
        };

        store.networkRequests.push(entry);
        pruneBuffer(store.networkRequests, CONFIG.bufferSize.network);

        logUiEvent("network_error", {
          kind: "fetch",
          method: entry.method,
          url: entry.url,
          message: error.message,

          meta: {
            severity: "high",
            type: "network_failure"
          }
        });

        // AI hook
        if (typeof smart_kh !== "undefined" && smart_kh.analyze) {
          smart_kh.analyze(store);
        }

        throw error;
      });
  };

  // ==========================================================================
  // SMART_KH XHR Intelligence (Start)
  // ==========================================================================

  const originalXHROpen = XMLHttpRequest.prototype.open;
  const originalXHRSend = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function (method, url) {
    this._smart_kh = {
      method: (method || "GET").toUpperCase(),
      url: url,
      startTime: null
    };

    return originalXHROpen.apply(this, arguments);
  };
  XMLHttpRequest.prototype.send = function (body) {
    const xhr = this;

    if (
      xhr._smart_kh &&
      xhr._smart_kh.url &&
      !xhr._smart_kh.url.startsWith("/__smart_kh__/")
    ) {
      xhr._smart_kh.startTime = Date.now();

      xhr._smart_kh.requestBody = body
        ? sanitizeValue(tryParseJson(body))
        : null;

      xhr.addEventListener("load", function () {
        const contentType =
          (xhr.getResponseHeader("content-type") || "").toLowerCase();

        let responseBody = null;

        const isStreaming =
          contentType.includes("text/event-stream") ||
          contentType.includes("application/stream") ||
          contentType.includes("application/x-ndjson");

        const isBinary =
          contentType.includes("image/") ||
          contentType.includes("video/") ||
          contentType.includes("audio/") ||
          contentType.includes("application/octet-stream") ||
          contentType.includes("application/pdf") ||
          contentType.includes("application/zip");

        if (isStreaming) {
          responseBody = "[Streaming]";
        } else if (isBinary) {
          responseBody = "[Binary: " + contentType + "]";
        } else {
          try {
            const text = xhr.responseText || "";

            if (text.length > CONFIG.maxBodyLength) {
              responseBody =
                text.slice(0, CONFIG.maxBodyLength) + "...[truncated]";
            } else {
              responseBody = sanitizeValue(tryParseJson(text));
            }
          } catch (e) {
            responseBody = "[Unreadable: " + e.message + "]";
          }
        }

        const entry = {
          timestamp: xhr._smart_kh.startTime,
          type: "xhr",

          method: xhr._smart_kh.method,
          url: xhr._smart_kh.url,

          request: {
            body: xhr._smart_kh.requestBody
          },

          response: {
            status: xhr.status,
            statusText: xhr.statusText,
            body: responseBody
          },

          duration: Date.now() - xhr._smart_kh.startTime,
          error: null,

          meta: {
            source: "network_xhr"
          }
        };

        store.networkRequests.push(entry);
        pruneBuffer(store.networkRequests, CONFIG.bufferSize.network);

        // detect http errors
        if (xhr.status >= 400) {
          logUiEvent("network_error", {
            kind: "xhr",
            method: entry.method,
            url: entry.url,

            status: xhr.status,
            statusText: xhr.statusText,

            meta: {
              severity: "medium",
              type: "http_error"
            }
          });
        }

        // AI hook
        if (typeof smart_kh !== "undefined" && smart_kh.analyze) {
          smart_kh.analyze(store);
        }
      });

      xhr.addEventListener("error", function () {
        const entry = {
          timestamp: xhr._smart_kh.startTime,
          type: "xhr",

          method: xhr._smart_kh.method,
          url: xhr._smart_kh.url,

          request: {
            body: xhr._smart_kh.requestBody
          },

          response: null,

          duration: Date.now() - xhr._smart_kh.startTime,

          error: {
            message: "Network error"
          },

          meta: {
            source: "network_xhr",
            severity: "high"
          }
        };
store.networkRequests.push(entry);
        pruneBuffer(store.networkRequests, CONFIG.bufferSize.network);

        // detect HTTP errors
        if (entry.response && entry.response.status >= 400) {
          logUiEvent("network_error", {
            kind: "xhr",
            method: entry.method,
            url: entry.url,

            status: entry.response.status,
            statusText: entry.response.statusText,

            meta: {
              severity: "medium",
              type: "http_error"
            }
          });
        }

        // AI hook
        if (typeof smart_kh !== "undefined" && smart_kh.analyze) {
          smart_kh.analyze(store);
        }
      });

      xhr.addEventListener("error", function () {
        const entry = {
          timestamp: xhr._smart_kh.startTime,
          type: "xhr",

          method: xhr._smart_kh.method,
          url: xhr._smart_kh.url,

          request: {
            body: xhr._smart_kh.requestBody
          },

          response: null,

          duration: Date.now() - xhr._smart_kh.startTime,

          error: {
            message: "Network error"
          },

          meta: {
            source: "network_xhr",
            severity: "high"
          }
        };

        store.networkRequests.push(entry);
        pruneBuffer(store.networkRequests, CONFIG.bufferSize.network);

        logUiEvent("network_error", {
          kind: "xhr",
          method: entry.method,
          url: entry.url,
          message: "Network error",

          meta: {
            severity: "high",
            type: "network_failure"
          }
        });

        // AI hook
        if (typeof smart_kh !== "undefined" && smart_kh.analyze) {
          smart_kh.analyze(store);
        }
      });
    }

    return originalXHRSend.apply(this, arguments);
  };
  // ==========================================================================
  // SMART_KH Data Reporting Engine
  // ==========================================================================

  function reportLogs() {
    const consoleLogs = store.consoleLogs.splice(0);
    const networkRequests = store.networkRequests.splice(0);
    const uiEvents = store.uiEvents.splice(0);

    // nothing to send
    if (
      consoleLogs.length === 0 &&
      networkRequests.length === 0 &&
      uiEvents.length === 0
    ) {
      return Promise.resolve();
    }

    const payload = {
      timestamp: Date.now(),

      consoleLogs,
      networkRequests,

      // session replay compatibility
      sessionEvents: uiEvents,

      // semantic events
      uiEvents,

      meta: {
        source: "smart_kh_client",
        version: "1.0.0"
      }
    };

    return originalFetch(CONFIG.reportEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }).catch(function () {
      // restore logs if sending failed
      store.consoleLogs = consoleLogs.concat(store.consoleLogs);
      store.networkRequests = networkRequests.concat(store.networkRequests);
      store.uiEvents = uiEvents.concat(store.uiEvents);

      pruneBuffer(store.consoleLogs, CONFIG.bufferSize.console);
      pruneBuffer(store.networkRequests, CONFIG.bufferSize.network);
      pruneBuffer(store.uiEvents, CONFIG.bufferSize.ui);
    });
  }
 // ==========================================================================
  // SMART_KH Reporting Scheduler + Safe Shutdown
  // ==========================================================================

  // periodic reporting
  setInterval(reportLogs, CONFIG.reportInterval);

  // send remaining data on page exit
  window.addEventListener("beforeunload", function () {
    const consoleLogs = store.consoleLogs;
    const networkRequests = store.networkRequests;
    const uiEvents = store.uiEvents;

    if (
      consoleLogs.length === 0 &&
      networkRequests.length === 0 &&
      uiEvents.length === 0
    ) {
      return;
    }

    let payload = {
      timestamp: Date.now(),

      consoleLogs,
      networkRequests,

      sessionEvents: uiEvents,
      uiEvents,

      meta: {
        source: "smart_kh_client",
        mode: "shutdown"
      }
    };

    if (navigator.sendBeacon) {
      let payloadStr = JSON.stringify(payload);

      const MAX_BEACON_SIZE = 60000;

      // truncate if too large
      if (payloadStr.length > MAX_BEACON_SIZE) {
        payload = {
          timestamp: Date.now(),

          consoleLogs: consoleLogs.slice(-50),
          networkRequests: networkRequests.slice(-20),

          sessionEvents: uiEvents.slice(-100),
          uiEvents: uiEvents.slice(-100),

          _truncated: true,

          meta: {
            source: "smart_kh_client",
            mode: "shutdown_truncated"
          }
        };

        payloadStr = JSON.stringify(payload);
      }

      navigator.sendBeacon(CONFIG.reportEndpoint, payloadStr);
    }
  });

 // ==========================================================================
// SMART_KH Initialization Engine
// ==========================================================================

try {
  installUiEventListeners();
} catch (e) {
  console.warn("[smart_kh] Failed to install UI listeners:", e);
}

// Mark system as initialized (global hook)
window.__SMART_KH_AI__ = {
  name: "smart_kh",
  version: "3.0.0",

  store: store,

  // manual trigger
  forceReport: reportLogs,

  // debug helpers
  getState: function () {
    return {
      consoleLogs: store.consoleLogs.length,
      networkRequests: store.networkRequests.length,
      uiEvents: store.uiEvents.length,
    };
  },

  // clear data manually
  clear: function () {
    store.consoleLogs = [];
    store.networkRequests = [];
    store.uiEvents = [];
  },

  // enable/disable system dynamically
  enabled: true,
  toggle: function (state) {
    this.enabled = typeof state === "boolean" ? state : !this.enabled;
    console.info("[smart_kh] system " + (this.enabled ? "enabled" : "disabled"));
  }
};

// Smart startup log
console.debug(
  "[smart_kh] AI Debug System initialized 🚀",
  {
    version: window.__SMART_KH_AI__.version,
    url: location.href
  }
);
// ==========================================================================
// SMART_KH Global Identity
// ==========================================================================

window.__SMART_KH_AI__ = {
  name: "smart_kh",
  version: "3.0.0",

  store: store,

  // manual reporting trigger
  forceReport: reportLogs,

  // system status
  status: "running",

  // quick stats
  stats: function () {
    return {
      consoleLogs: store.consoleLogs.length,
      networkRequests: store.networkRequests.length,
      uiEvents: store.uiEvents.length,
    };
  },

  // clear all stored data
  clear: function () {
    store.consoleLogs = [];
    store.networkRequests = [];
    store.uiEvents = [];
    console.info("[smart_kh] data cleared");
  }
};

})();
