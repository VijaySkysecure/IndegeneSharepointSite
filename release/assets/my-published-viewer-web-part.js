define(["react","react-dom","@microsoft/sp-core-library","@microsoft/sp-property-pane","@microsoft/sp-webpart-base","@microsoft/sp-http"], (__WEBPACK_EXTERNAL_MODULE__5959__, __WEBPACK_EXTERNAL_MODULE__8398__, __WEBPACK_EXTERNAL_MODULE__9676__, __WEBPACK_EXTERNAL_MODULE__9877__, __WEBPACK_EXTERNAL_MODULE__6642__, __WEBPACK_EXTERNAL_MODULE__1909__) => { return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 3067:
/*!************************************************************************!*\
  !*** ./lib/webparts/myPublishedViewer/components/MyPublishedViewer.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-http */ 1909);
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__);
// MyPublishedViewer.tsx
// MyPublishedViewer.tsx
// Clean, corrected version with column label mapping and per-column expand/collapse
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};


// Map internal column/internal field names -> friendly display labels
var COLUMN_LABELS = {
    DocIcon: 'Type',
    FileLeafRef: 'Name',
    Status: 'Status',
    TitleName: 'Title Name',
    Abstract: 'Abstract',
    BusinessUnit: 'Business Unit',
    Department: 'Department',
    Region: 'Region',
    Client: 'Client',
    DocumentType: 'Document Type',
    DiseaseArea: 'Disease Area',
    TherapyArea: 'Therapy Area',
    Emails: 'Emails',
    Phones: 'Phones',
    IDs: 'IDs',
    SensitiveTerms: 'Sensitive Terms',
    PerformedBy: 'Performed By',
    TimeStamp: 'Time Stamp',
    KMCorrections: 'KM Corrections',
    KMComments: 'KM Comments',
    Modified: 'Modified',
    Editor: 'Modified By'
};
var MyPublishedViewer = /** @class */ (function (_super) {
    __extends(MyPublishedViewer, _super);
    function MyPublishedViewer(props) {
        var _this = _super.call(this, props) || this;
        // All columns will be expanded by default with standard formatting
        _this.state = { items: [], loading: true, expandedCols: [], hoverCol: undefined };
        return _this;
    }
    // Get standard column width based on column type
    MyPublishedViewer.prototype.getColumnWidth = function (col) {
        if (col === "Abstract") {
            return { width: "600px", minWidth: "400px", maxWidth: "600px" };
        }
        else if (col === "FileLeafRef" || col === "TitleName") {
            return { width: "400px", minWidth: "250px", maxWidth: "400px" };
        }
        else if (col === "KMCorrections" || col === "KMComments") {
            return { width: "500px", minWidth: "300px", maxWidth: "500px" };
        }
        else {
            return { width: "200px", minWidth: "150px", maxWidth: "300px" };
        }
    };
    MyPublishedViewer.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadItems()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyPublishedViewer.prototype.getCurrentUserId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resp, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.context.spHttpClient.get("".concat(this.props.context.pageContext.web.absoluteUrl, "/_api/web/currentuser"), _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__.SPHttpClient.configurations.v1)];
                    case 1:
                        resp = _a.sent();
                        if (!resp.ok) {
                            throw new Error("Failed to get current user: ".concat(resp.status, " ").concat(resp.statusText));
                        }
                        return [4 /*yield*/, resp.json()];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, user.Id]; // numeric ID
                }
            });
        });
    };
    MyPublishedViewer.prototype.loadItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var siteUrl, filter, currentUserId, colArray, additionalCols, selectColsForQuery, url, resp, errorText, data, items, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        siteUrl = this.props.context.pageContext.web.absoluteUrl;
                        filter = '';
                        if (!(this.props.mode === 'myDocuments')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getCurrentUserId()];
                    case 1:
                        currentUserId = _a.sent();
                        filter = "PerformedBy/Id eq ".concat(currentUserId);
                        console.log("[MyPublishedViewer] My Documents mode - Filtering by user ID: ".concat(currentUserId));
                        return [3 /*break*/, 3];
                    case 2:
                        if (this.props.mode === 'published') {
                            // Published: Show ALL published documents from ALL users (no user filter)
                            // Note: SharePoint will automatically apply security trimming - users will only see documents they have read permissions for
                            filter = "Status eq 'Published'";
                            console.log("[MyPublishedViewer] Published mode - Showing all published documents (security trimmed by SharePoint)");
                        }
                        else {
                            // Default: Show all published documents
                            filter = "Status eq 'Published'";
                            console.log("[MyPublishedViewer] Default mode - Showing all published documents");
                        }
                        _a.label = 3;
                    case 3:
                        colArray = (this.props.columns || '').split(',').map(function (c) { return c.trim(); }).filter(function (c) { return c; });
                        additionalCols = [
                            'Id',
                            'PerformedBy/Id',
                            'PerformedBy/Title',
                            'Editor/Id',
                            'Editor/Title'
                        ];
                        // If the user requested FileLeafRef (filename), also request FileRef (server-relative URL)
                        if (colArray.indexOf('FileLeafRef') !== -1) {
                            additionalCols.push('FileRef');
                        }
                        selectColsForQuery = Array.from(new Set(__spreadArray(__spreadArray([], colArray, true), additionalCols, true))).join(',');
                        url = "".concat(siteUrl, "/_api/web/lists/getbytitle('").concat(this.props.listTitle, "')/items") +
                            "?$select=".concat(selectColsForQuery) +
                            "&$expand=PerformedBy,Editor" +
                            "&$filter=".concat(encodeURIComponent(filter)) +
                            "&$orderby=Modified desc";
                        console.log("[MyPublishedViewer] Fetching from: ".concat(url));
                        console.log("[MyPublishedViewer] Mode: ".concat(this.props.mode, ", Filter: ").concat(filter));
                        return [4 /*yield*/, this.props.context.spHttpClient.get(url, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__.SPHttpClient.configurations.v1)];
                    case 4:
                        resp = _a.sent();
                        if (!!resp.ok) return [3 /*break*/, 6];
                        return [4 /*yield*/, resp.text()];
                    case 5:
                        errorText = _a.sent();
                        console.error("[MyPublishedViewer] API Error - Status: ".concat(resp.status, ", Response:"), errorText);
                        throw new Error("Failed to load items: ".concat(resp.status, " ").concat(resp.statusText, ". ").concat(errorText));
                    case 6: return [4 /*yield*/, resp.json()];
                    case 7:
                        data = _a.sent();
                        items = data.value || [];
                        console.log("[MyPublishedViewer] Successfully loaded ".concat(items.length, " items"));
                        if (items.length === 0) {
                            console.warn("[MyPublishedViewer] No items returned. This could be due to:");
                            console.warn("  - No documents match the filter criteria");
                            console.warn("  - User doesn't have read permissions on the documents");
                            console.warn("  - Library permissions may need to be adjusted for regular users");
                        }
                        this.setState({
                            items: items,
                            loading: false
                        });
                        return [3 /*break*/, 9];
                    case 8:
                        e_1 = _a.sent();
                        console.error('[MyPublishedViewer] Error loading items:', e_1);
                        console.error('[MyPublishedViewer] Error details:', {
                            mode: this.props.mode,
                            listTitle: this.props.listTitle,
                            error: e_1 instanceof Error ? e_1.message : String(e_1)
                        });
                        this.setState({ items: [], loading: false });
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    MyPublishedViewer.prototype.toggleExpandColumn = function (col) {
        this.setState(function (prev) {
            var expanded = new Set(prev.expandedCols || []);
            if (expanded.has(col)) {
                expanded.delete(col);
            }
            else {
                expanded.add(col);
            }
            return { expandedCols: Array.from(expanded) };
        });
    };
    MyPublishedViewer.prototype.render = function () {
        var _this = this;
        var _a = this.state, items = _a.items, loading = _a.loading, expandedCols = _a.expandedCols, hoverCol = _a.hoverCol;
        var colArray = (this.props.columns || '').split(',').map(function (c) { return c.trim(); }).filter(function (c) { return c; });
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { overflowX: "auto", width: "100%" } },
            loading && react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, "Loading..."),
            !loading && items.length === 0 && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, "No documents found.")),
            !loading && items.length > 0 && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("table", { style: { width: "100%", borderCollapse: "collapse" } },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("thead", null,
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("tr", null, colArray.map(function (col) {
                        var isHovered = hoverCol === col;
                        var isExpanded = expandedCols && expandedCols.indexOf(col) !== -1;
                        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", { key: col, onMouseEnter: function () { return _this.setState({ hoverCol: col }); }, onMouseLeave: function () { return _this.setState({ hoverCol: undefined }); }, style: {
                                textAlign: "center",
                                borderBottom: "1px solid #ccc",
                                padding: "8px",
                                whiteSpace: "nowrap",
                                position: 'relative'
                            } },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, COLUMN_LABELS[col] || col),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { title: isExpanded ? 'Collapse column' : 'Expand column', onClick: function (e) { e.stopPropagation(); _this.toggleExpandColumn(col); }, style: {
                                        marginLeft: 6,
                                        display: isHovered ? 'inline-block' : 'none',
                                        border: 'none',
                                        background: 'transparent',
                                        cursor: 'pointer',
                                        padding: 2,
                                        lineHeight: 1
                                    } }, isExpanded ? '▾' : '▸'))));
                    }))),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("tbody", null, items.map(function (item) { return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("tr", { key: item.Id }, colArray.map(function (col) {
                    var _a, _b;
                    // Get standard column dimensions
                    var colDimensions = _this.getColumnWidth(col);
                    // Apply standard formatting to all columns
                    var style = {
                        padding: "12px",
                        borderBottom: "1px solid #eee",
                        textAlign: "center",
                        verticalAlign: "top",
                        whiteSpace: "pre-wrap",
                        width: colDimensions.width,
                        minWidth: colDimensions.minWidth,
                        maxWidth: colDimensions.maxWidth,
                        minHeight: col === "Abstract" ? "100px" : col === "FileLeafRef" || col === "TitleName" ? "80px" : "60px",
                        maxHeight: "none",
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                        lineHeight: "1.6"
                    };
                    // Standard formatting wrapper for all cell content
                    var cellContentStyle = {
                        lineHeight: '1.6',
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        maxWidth: '100%',
                        whiteSpace: 'pre-wrap',
                        textAlign: 'center'
                    };
                    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", { key: col, style: style }, col === 'PerformedBy' ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: cellContentStyle }, ((_a = item === null || item === void 0 ? void 0 : item.PerformedBy) === null || _a === void 0 ? void 0 : _a.Title) || "")) : col === 'Editor' ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: cellContentStyle }, ((_b = item === null || item === void 0 ? void 0 : item.Editor) === null || _b === void 0 ? void 0 : _b.Title) || "")
                    /* File Name with link */
                    ) : col === 'FileLeafRef' ? (
                    // 2️⃣ Special handling for FileLeafRef with link
                    item.FileRef ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: cellContentStyle },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { href: item.FileRef, target: "_blank", rel: "noreferrer", style: {
                                color: 'inherit',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word'
                            } }, item[col] ? item[col].toString() : ''))) : (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: cellContentStyle }, item[col] ? item[col].toString() : ''))) : (
                    // 3️⃣ Default for all other columns
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: cellContentStyle }, item[col] ? item[col].toString() : ''))));
                }))); }))))));
    };
    return MyPublishedViewer;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyPublishedViewer);


/***/ }),

/***/ 9676:
/*!*********************************************!*\
  !*** external "@microsoft/sp-core-library" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__9676__;

/***/ }),

/***/ 1909:
/*!*************************************!*\
  !*** external "@microsoft/sp-http" ***!
  \*************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__1909__;

/***/ }),

/***/ 9877:
/*!**********************************************!*\
  !*** external "@microsoft/sp-property-pane" ***!
  \**********************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__9877__;

/***/ }),

/***/ 6642:
/*!*********************************************!*\
  !*** external "@microsoft/sp-webpart-base" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__6642__;

/***/ }),

/***/ 5959:
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__5959__;

/***/ }),

/***/ 8398:
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__8398__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************************************************************!*\
  !*** ./lib/webparts/myPublishedViewer/MyPublishedViewerWebPart.js ***!
  \********************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ 8398);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ 9676);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_property_pane__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-property-pane */ 9877);
/* harmony import */ var _microsoft_sp_property_pane__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_property_pane__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/sp-webpart-base */ 6642);
/* harmony import */ var _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_MyPublishedViewer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/MyPublishedViewer */ 3067);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var MyPublishedViewerWebPart = /** @class */ (function (_super) {
    __extends(MyPublishedViewerWebPart, _super);
    function MyPublishedViewerWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyPublishedViewerWebPart.prototype.render = function () {
        var element = react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_MyPublishedViewer__WEBPACK_IMPORTED_MODULE_5__["default"], {
            context: this.context,
            listTitle: this.properties.listTitle,
            columns: this.properties.columns,
            mode: this.properties.mode
        });
        react_dom__WEBPACK_IMPORTED_MODULE_1__.render(element, this.domElement);
    };
    MyPublishedViewerWebPart.prototype.onDispose = function () {
        react_dom__WEBPACK_IMPORTED_MODULE_1__.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(MyPublishedViewerWebPart.prototype, "dataVersion", {
        get: function () {
            return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__.Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    MyPublishedViewerWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: { description: "Configure My Documents / Published Viewer" },
                    groups: [
                        {
                            groupName: "Settings",
                            groupFields: [
                                (0,_microsoft_sp_property_pane__WEBPACK_IMPORTED_MODULE_3__.PropertyPaneTextField)('listTitle', {
                                    label: 'Library Name (e.g., KMArtifacts)'
                                }),
                                (0,_microsoft_sp_property_pane__WEBPACK_IMPORTED_MODULE_3__.PropertyPaneTextField)('columns', {
                                    label: 'Columns (comma-separated, e.g., Title,Status,Modified)'
                                }),
                                (0,_microsoft_sp_property_pane__WEBPACK_IMPORTED_MODULE_3__.PropertyPaneDropdown)('mode', {
                                    label: 'Select Mode',
                                    options: [
                                        { key: 'myDocuments', text: 'My Documents' },
                                        { key: 'published', text: 'Published' }
                                    ]
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return MyPublishedViewerWebPart;
}(_microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_4__.BaseClientSideWebPart));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyPublishedViewerWebPart);

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});;
//# sourceMappingURL=my-published-viewer-web-part.js.map