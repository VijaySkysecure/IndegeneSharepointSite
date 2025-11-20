define("a1b2c3d4-e5f6-7890-abcd-ef1234567892_1.0.0", ["react","react-dom","@microsoft/sp-core-library","@microsoft/sp-property-pane","@microsoft/sp-webpart-base","MigrationWebPartStrings"], (__WEBPACK_EXTERNAL_MODULE__5959__, __WEBPACK_EXTERNAL_MODULE__8398__, __WEBPACK_EXTERNAL_MODULE__9676__, __WEBPACK_EXTERNAL_MODULE__9877__, __WEBPACK_EXTERNAL_MODULE__6642__, __WEBPACK_EXTERNAL_MODULE__9943__) => { return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 8048:
/*!**********************************************************************************!*\
  !*** ./lib/webparts/migration/components/BUContentArea/BUContentArea.module.css ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/@microsoft/sp-css-loader/node_modules/@microsoft/load-themed-styles/lib-es6/index.js */ 6323);
// Imports


_node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__.loadStyles(".contentArea_bb56a150{align-items:center;background-color:#e3f2fd;box-sizing:border-box;display:flex;font-family:Inter,sans-serif;height:330px;justify-content:center;padding:40px 60px;width:100%}.contentContainer_bb56a150{margin:0 auto;max-width:1400px;text-align:center}.contentText_bb56a150{color:#424242;font-family:Inter,sans-serif;font-size:24px;font-weight:400;margin:0 0 30px}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvVmFtc2hpa1NoZXR0eS9PbmVEcml2ZSUyMC0lMjBTS1lTRUNVUkUlMjBURUNITk9MT0dJRVMlMjBQUklWQVRFJTIwTElNSVRFRC9EZXNrdG9wL1NreVNlY3VyZS9JbmRlZ2VuZVNoYXJlcG9pbnRTaXRlL3NyYy93ZWJwYXJ0cy9taWdyYXRpb24vY29tcG9uZW50cy9CVUNvbnRlbnRBcmVhL0JVQ29udGVudEFyZWEubW9kdWxlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsc0JBT0Usa0JBQUEsQ0FMQSx3QkFBQSxDQUVBLHFCQUFBLENBRUEsWUFBQSxDQUdBLDRCQUFBLENBSkEsWUFBQSxDQUdBLHNCQUFBLENBTEEsaUJBQUEsQ0FGQSxVQVFBLENBR0YsMkJBR0UsYUFBQSxDQURBLGdCQUFBLENBREEsaUJBRUEsQ0FHRixzQkFFRSxhQUFBLENBR0EsNEJBQUEsQ0FKQSxjQUFBLENBR0EsZUFBQSxDQURBLGVBRUEiLCJmaWxlIjoiQlVDb250ZW50QXJlYS5tb2R1bGUuY3NzIn0= */", true);

// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  contentArea_bb56a150: "contentArea_bb56a150",
  contentContainer_bb56a150: "contentContainer_bb56a150",
  contentText_bb56a150: "contentText_bb56a150"
});


/***/ }),

/***/ 6320:
/*!********************************************************************************!*\
  !*** ./lib/webparts/migration/components/BUDetailPage/BUDetailPage.module.css ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/@microsoft/sp-css-loader/node_modules/@microsoft/load-themed-styles/lib-es6/index.js */ 6323);
// Imports


_node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__.loadStyles(".buDetailPage_291ec8d4{display:flex;flex-direction:column;font-family:Inter,sans-serif;margin:0;min-height:100vh;padding:0;width:100%}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvVmFtc2hpa1NoZXR0eS9PbmVEcml2ZSUyMC0lMjBTS1lTRUNVUkUlMjBURUNITk9MT0dJRVMlMjBQUklWQVRFJTIwTElNSVRFRC9EZXNrdG9wL1NreVNlY3VyZS9JbmRlZ2VuZVNoYXJlcG9pbnRTaXRlL3NyYy93ZWJwYXJ0cy9taWdyYXRpb24vY29tcG9uZW50cy9CVURldGFpbFBhZ2UvQlVEZXRhaWxQYWdlLm1vZHVsZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHVCQUdFLFlBQUEsQ0FDQSxxQkFBQSxDQUdBLDRCQUFBLENBRkEsUUFBQSxDQUhBLGdCQUFBLENBSUEsU0FBQSxDQUxBLFVBTUEiLCJmaWxlIjoiQlVEZXRhaWxQYWdlLm1vZHVsZS5jc3MifQ== */", true);

// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  buDetailPage_291ec8d4: "buDetailPage_291ec8d4"
});


/***/ }),

/***/ 3690:
/*!************************************************************************!*\
  !*** ./lib/webparts/migration/components/BUHeader/BUHeader.module.css ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/@microsoft/sp-css-loader/node_modules/@microsoft/load-themed-styles/lib-es6/index.js */ 6323);
// Imports


_node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__.loadStyles(".buHeader_a61c6b58{background-color:#1976d2;box-sizing:border-box;color:#fff;font-family:Inter,sans-serif;padding:40px 60px;width:100%}.headerContent_a61c6b58{align-items:flex-start;display:flex;justify-content:space-between;margin:0 auto;max-width:1400px}.leftSection_a61c6b58{flex:1;position:relative}.backButton_a61c6b58{align-items:center;background-color:transparent;border:none;cursor:pointer;display:flex;justify-content:center;left:-40px;padding:8px;position:absolute;top:0;transition:transform .2s,opacity .2s;z-index:10}.backButton_a61c6b58:hover{opacity:.8;transform:translateX(-3px)}.backButton_a61c6b58:active{transform:translateX(-1px)}.backArrow_a61c6b58{flex-shrink:0;height:24px;width:24px}.buName_a61c6b58{color:#fff;font-family:Inter,sans-serif;font-size:48px;font-weight:700;margin:0 0 10px}.description_a61c6b58{font-weight:400;margin:0 0 20px;opacity:.95}.addFileButton_a61c6b58,.description_a61c6b58{color:#fff;font-family:Inter,sans-serif;font-size:16px}.addFileButton_a61c6b58{background-color:#1565c0;border:none;border-radius:4px;cursor:pointer;font-weight:500;padding:12px 24px;transition:background-color .3s}.addFileButton_a61c6b58:hover{background-color:#0d47a1}.rightSection_a61c6b58{align-items:flex-end;display:flex;flex-direction:column;gap:20px}.buHead_a61c6b58{color:#fff;font-family:Inter,sans-serif;font-size:18px;font-weight:500}.searchContainer_a61c6b58{align-items:center;background-color:#fff;border-radius:4px;display:flex;min-width:300px;padding:8px 16px}.searchIcon_a61c6b58{flex-shrink:0;height:18px;margin-right:10px;width:18px}.searchInput_a61c6b58{background:0 0;border:none;color:#333;flex:1;font-family:Inter,sans-serif;font-size:16px;font-weight:400;outline:0}.searchInput:-ms-input-placeholder{color:#999}.searchInput_a61c6b58:-ms-input-placeholder{color:#999}.searchInput_a61c6b58::placeholder{color:#999}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvVmFtc2hpa1NoZXR0eS9PbmVEcml2ZSUyMC0lMjBTS1lTRUNVUkUlMjBURUNITk9MT0dJRVMlMjBQUklWQVRFJTIwTElNSVRFRC9EZXNrdG9wL1NreVNlY3VyZS9JbmRlZ2VuZVNoYXJlcG9pbnRTaXRlL3NyYy93ZWJwYXJ0cy9taWdyYXRpb24vY29tcG9uZW50cy9CVUhlYWRlci9CVUhlYWRlci5tb2R1bGUuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxtQkFFRSx3QkFBQSxDQUdBLHFCQUFBLENBREEsVUFBQSxDQUVBLDRCQUFBLENBSEEsaUJBQUEsQ0FGQSxVQUtBLENBR0Ysd0JBR0Usc0JBQUEsQ0FGQSxZQUFBLENBQ0EsNkJBQUEsQ0FHQSxhQUFBLENBREEsZ0JBQ0EsQ0FHRixzQkFDRSxNQUFBLENBQ0EsaUJBQUEsQ0FHRixxQkFTRSxrQkFBQSxDQUxBLDRCQUFBLENBQ0EsV0FBQSxDQUNBLGNBQUEsQ0FFQSxZQUFBLENBRUEsc0JBQUEsQ0FQQSxVQUFBLENBSUEsV0FBQSxDQU5BLGlCQUFBLENBQ0EsS0FBQSxDQVNBLG9DQUFBLENBQ0EsVUFBQSxDQUVBLDJCQUVFLFVBQUEsQ0FEQSwwQkFDQSxDQUdGLDRCQUNFLDBCQUFBLENBSUosb0JBR0UsYUFBQSxDQURBLFdBQUEsQ0FEQSxVQUVBLENBR0YsaUJBSUUsVUFBQSxDQUNBLDRCQUFBLENBSkEsY0FBQSxDQUNBLGVBQUEsQ0FDQSxlQUVBLENBR0Ysc0JBS0UsZUFBQSxDQUhBLGVBQUEsQ0FFQSxXQUVBLENBR0YsOENBTkUsVUFBQSxDQUdBLDRCQUFBLENBTEEsY0FrQkEsQ0FWRix3QkFDRSx3QkFBQSxDQUVBLFdBQUEsQ0FJQSxpQkFBQSxDQURBLGNBQUEsQ0FFQSxlQUFBLENBSkEsaUJBQUEsQ0FNQSwrQkFBQSxDQUVBLDhCQUNFLHdCQUFBLENBSUosdUJBR0Usb0JBQUEsQ0FGQSxZQUFBLENBQ0EscUJBQUEsQ0FFQSxRQUFBLENBR0YsaUJBRUUsVUFBQSxDQUVBLDRCQUFBLENBSEEsY0FBQSxDQUVBLGVBQ0EsQ0FHRiwwQkFFRSxrQkFBQSxDQUNBLHFCQUFBLENBQ0EsaUJBQUEsQ0FIQSxZQUFBLENBS0EsZUFBQSxDQURBLGdCQUNBLENBR0YscUJBSUUsYUFBQSxDQUZBLFdBQUEsQ0FDQSxpQkFBQSxDQUZBLFVBR0EsQ0FHRixzQkFNRSxjQUFBLENBTEEsV0FBQSxDQUlBLFVBQUEsQ0FGQSxNQUFBLENBSUEsNEJBQUEsQ0FIQSxjQUFBLENBSUEsZUFBQSxDQU5BLFNBTUEsQ0FFQSxtQ0FDRSxVQUFBLENBREYsNENBQ0UsVUFBQSxDQURGLG1DQUNFLFVBQUEiLCJmaWxlIjoiQlVIZWFkZXIubW9kdWxlLmNzcyJ9 */", true);

// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  buHeader_a61c6b58: "buHeader_a61c6b58",
  headerContent_a61c6b58: "headerContent_a61c6b58",
  leftSection_a61c6b58: "leftSection_a61c6b58",
  backButton_a61c6b58: "backButton_a61c6b58",
  backArrow_a61c6b58: "backArrow_a61c6b58",
  buName_a61c6b58: "buName_a61c6b58",
  description_a61c6b58: "description_a61c6b58",
  addFileButton_a61c6b58: "addFileButton_a61c6b58",
  rightSection_a61c6b58: "rightSection_a61c6b58",
  buHead_a61c6b58: "buHead_a61c6b58",
  searchContainer_a61c6b58: "searchContainer_a61c6b58",
  searchIcon_a61c6b58: "searchIcon_a61c6b58",
  searchInput_a61c6b58: "searchInput_a61c6b58",
  searchInput: "searchInput"
});


/***/ }),

/***/ 3232:
/*!********************************************************************************!*\
  !*** ./lib/webparts/migration/components/BUNavigation/BUNavigation.module.css ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/@microsoft/sp-css-loader/node_modules/@microsoft/load-themed-styles/lib-es6/index.js */ 6323);
// Imports


_node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__.loadStyles(".buNavigation_62aa4de0{background-color:#e3f2fd;box-shadow:0 2px 4px rgba(0,0,0,.1);font-family:Inter,sans-serif;padding:0;width:100%}.navContainer_62aa4de0{align-items:center;display:flex;gap:0;margin:0 auto;max-width:1400px;padding:0 60px}.navItem_62aa4de0{border-bottom:3px solid transparent;color:#424242;font-family:Inter,sans-serif;font-size:16px;font-weight:500;padding:16px 24px;text-decoration:none;transition:background-color .3s}.navItem_62aa4de0:hover{background-color:hsla(0,0%,100%,.5)}.navItem_62aa4de0.active_62aa4de0{background-color:#81d4fa;border-bottom:3px solid #1976d2;color:#424242}.dottedLine_62aa4de0{background-color:transparent;border-top:2px dotted #90caf9;height:2px;margin-top:0;width:100%}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvVmFtc2hpa1NoZXR0eS9PbmVEcml2ZSUyMC0lMjBTS1lTRUNVUkUlMjBURUNITk9MT0dJRVMlMjBQUklWQVRFJTIwTElNSVRFRC9EZXNrdG9wL1NreVNlY3VyZS9JbmRlZ2VuZVNoYXJlcG9pbnRTaXRlL3NyYy93ZWJwYXJ0cy9taWdyYXRpb24vY29tcG9uZW50cy9CVU5hdmlnYXRpb24vQlVOYXZpZ2F0aW9uLm1vZHVsZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHVCQUVFLHdCQUFBLENBRUEsbUNBQUEsQ0FDQSw0QkFBQSxDQUZBLFNBQUEsQ0FGQSxVQUlBLENBR0YsdUJBRUUsa0JBQUEsQ0FEQSxZQUFBLENBS0EsS0FBQSxDQUZBLGFBQUEsQ0FEQSxnQkFBQSxDQUVBLGNBQ0EsQ0FHRixrQkFRRSxtQ0FBQSxDQUxBLGFBQUEsQ0FHQSw0QkFBQSxDQUZBLGNBQUEsQ0FDQSxlQUFBLENBSkEsaUJBQUEsQ0FDQSxvQkFBQSxDQUtBLCtCQUNBLENBRUEsd0JBQ0UsbUNBQUEsQ0FHRixrQ0FDRSx3QkFBQSxDQUVBLCtCQUFBLENBREEsYUFDQSxDQUlKLHFCQUtFLDRCQUFBLENBRkEsNkJBQUEsQ0FEQSxVQUFBLENBRUEsWUFBQSxDQUhBLFVBSUEiLCJmaWxlIjoiQlVOYXZpZ2F0aW9uLm1vZHVsZS5jc3MifQ== */", true);

// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  buNavigation_62aa4de0: "buNavigation_62aa4de0",
  navContainer_62aa4de0: "navContainer_62aa4de0",
  navItem_62aa4de0: "navItem_62aa4de0",
  active_62aa4de0: "active_62aa4de0",
  dottedLine_62aa4de0: "dottedLine_62aa4de0"
});


/***/ }),

/***/ 3116:
/*!******************************************************************************************!*\
  !*** ./lib/webparts/migration/components/BUQuestionSection/BUQuestionSection.module.css ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/@microsoft/sp-css-loader/node_modules/@microsoft/load-themed-styles/lib-es6/index.js */ 6323);
// Imports


_node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__.loadStyles(".questionSection_6f50e07b{background-color:#1976d2;box-sizing:border-box;font-family:Inter,sans-serif;padding:40px 60px;width:100%}.questionContainer_6f50e07b{align-items:center;display:flex;gap:30px;justify-content:space-between;margin:0 auto;max-width:1400px}.leftPrompt_6f50e07b{flex-shrink:0}.promptText_6f50e07b{color:#fff;font-family:Inter,sans-serif;font-size:20px;font-weight:500;margin:0;white-space:nowrap}.rightInput_6f50e07b{flex:1;max-width:600px}.questionInput_6f50e07b{background-color:#fff;border:none;border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,.1);box-sizing:border-box;color:#333;font-family:Inter,sans-serif;font-size:16px;font-weight:400;outline:0;padding:16px 20px;width:100%}.questionInput:-ms-input-placeholder{color:#999}.questionInput_6f50e07b:-ms-input-placeholder{color:#999}.questionInput_6f50e07b::placeholder{color:#999}.questionInput_6f50e07b:focus{box-shadow:0 2px 12px rgba(0,0,0,.15)}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvVmFtc2hpa1NoZXR0eS9PbmVEcml2ZSUyMC0lMjBTS1lTRUNVUkUlMjBURUNITk9MT0dJRVMlMjBQUklWQVRFJTIwTElNSVRFRC9EZXNrdG9wL1NreVNlY3VyZS9JbmRlZ2VuZVNoYXJlcG9pbnRTaXRlL3NyYy93ZWJwYXJ0cy9taWdyYXRpb24vY29tcG9uZW50cy9CVVF1ZXN0aW9uU2VjdGlvbi9CVVF1ZXN0aW9uU2VjdGlvbi5tb2R1bGUuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQkFFRSx3QkFBQSxDQUVBLHFCQUFBLENBQ0EsNEJBQUEsQ0FGQSxpQkFBQSxDQUZBLFVBSUEsQ0FHRiw0QkFFRSxrQkFBQSxDQURBLFlBQUEsQ0FLQSxRQUFBLENBSEEsNkJBQUEsQ0FFQSxhQUFBLENBREEsZ0JBRUEsQ0FHRixxQkFDRSxhQUFBLENBR0YscUJBRUUsVUFBQSxDQUdBLDRCQUFBLENBSkEsY0FBQSxDQUdBLGVBQUEsQ0FEQSxRQUFBLENBR0Esa0JBQUEsQ0FHRixxQkFDRSxNQUFBLENBQ0EsZUFBQSxDQUdGLHdCQU1FLHFCQUFBLENBSEEsV0FBQSxDQUNBLGlCQUFBLENBTUEsbUNBQUEsQ0FGQSxxQkFBQSxDQURBLFVBQUEsQ0FJQSw0QkFBQSxDQU5BLGNBQUEsQ0FPQSxlQUFBLENBSEEsU0FBQSxDQVBBLGlCQUFBLENBREEsVUFXQSxDQUVBLHFDQUNFLFVBQUEsQ0FERiw4Q0FDRSxVQUFBLENBREYscUNBQ0UsVUFBQSxDQUdGLDhCQUNFLHFDQUFBIiwiZmlsZSI6IkJVUXVlc3Rpb25TZWN0aW9uLm1vZHVsZS5jc3MifQ== */", true);

// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  questionSection_6f50e07b: "questionSection_6f50e07b",
  questionContainer_6f50e07b: "questionContainer_6f50e07b",
  leftPrompt_6f50e07b: "leftPrompt_6f50e07b",
  promptText_6f50e07b: "promptText_6f50e07b",
  rightInput_6f50e07b: "rightInput_6f50e07b",
  questionInput_6f50e07b: "questionInput_6f50e07b",
  questionInput: "questionInput"
});


/***/ }),

/***/ 8052:
/*!******************************************************************************!*\
  !*** ./lib/webparts/migration/components/ContentArea/ContentArea.module.css ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/@microsoft/sp-css-loader/node_modules/@microsoft/load-themed-styles/lib-es6/index.js */ 6323);
// Imports


_node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__.loadStyles(".contentArea_e198527e{align-items:center;background-color:#e3f2fd;box-sizing:border-box;display:flex;font-family:Inter,sans-serif;height:330px;justify-content:center;padding:40px 60px;width:100%}.contentContainer_e198527e{margin:0 auto;max-width:1400px;text-align:center}.contentText_e198527e{color:#424242;font-family:Inter,sans-serif;font-size:24px;font-weight:400;margin:0 0 30px}.carouselIndicators_e198527e{display:flex;gap:12px;justify-content:center;margin-top:20px}.dot_e198527e{background-color:#90caf9;border-radius:50%;cursor:pointer;height:12px;transition:transform .3s,background-color .3s;width:12px}.dot_e198527e:hover{background-color:#64b5f6;transform:scale(1.2)}.dot_e198527e.active_e198527e{background-color:#1976d2}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvVmFtc2hpa1NoZXR0eS9PbmVEcml2ZSUyMC0lMjBTS1lTRUNVUkUlMjBURUNITk9MT0dJRVMlMjBQUklWQVRFJTIwTElNSVRFRC9EZXNrdG9wL1NreVNlY3VyZS9JbmRlZ2VuZVNoYXJlcG9pbnRTaXRlL3NyYy93ZWJwYXJ0cy9taWdyYXRpb24vY29tcG9uZW50cy9Db250ZW50QXJlYS9Db250ZW50QXJlYS5tb2R1bGUuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxzQkFPRSxrQkFBQSxDQUxBLHdCQUFBLENBRUEscUJBQUEsQ0FFQSxZQUFBLENBR0EsNEJBQUEsQ0FKQSxZQUFBLENBR0Esc0JBQUEsQ0FMQSxpQkFBQSxDQUZBLFVBUUEsQ0FHRiwyQkFHRSxhQUFBLENBREEsZ0JBQUEsQ0FEQSxpQkFFQSxDQUdGLHNCQUVFLGFBQUEsQ0FHQSw0QkFBQSxDQUpBLGNBQUEsQ0FHQSxlQUFBLENBREEsZUFFQSxDQUdGLDZCQUNFLFlBQUEsQ0FFQSxRQUFBLENBREEsc0JBQUEsQ0FFQSxlQUFBLENBR0YsY0FJRSx3QkFBQSxDQURBLGlCQUFBLENBRUEsY0FBQSxDQUhBLFdBQUEsQ0FJQSw2Q0FBQSxDQUxBLFVBS0EsQ0FFQSxvQkFFRSx3QkFBQSxDQURBLG9CQUNBLENBR0YsOEJBQ0Usd0JBQUEiLCJmaWxlIjoiQ29udGVudEFyZWEubW9kdWxlLmNzcyJ9 */", true);

// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  contentArea_e198527e: "contentArea_e198527e",
  contentContainer_e198527e: "contentContainer_e198527e",
  contentText_e198527e: "contentText_e198527e",
  carouselIndicators_e198527e: "carouselIndicators_e198527e",
  dot_e198527e: "dot_e198527e",
  active_e198527e: "active_e198527e"
});


/***/ }),

/***/ 880:
/*!****************************************************************************!*\
  !*** ./lib/webparts/migration/components/FileUpload/FileUpload.module.css ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/@microsoft/sp-css-loader/node_modules/@microsoft/load-themed-styles/lib-es6/index.js */ 6323);
// Imports


_node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__.loadStyles(".overlay_3200fcfd{background:rgba(0,0,0,.45);font-family:Inter,sans-serif;inset:0;position:fixed;z-index:9999}.modal_3200fcfd,.overlay_3200fcfd{align-items:center;display:flex;justify-content:center}.modal_3200fcfd{background:0 0;border-radius:12px;box-shadow:none;max-width:96%;padding:0;width:auto}.uploadCard_3200fcfd{background:#fff;border-radius:12px;box-shadow:0 18px 40px rgba(0,0,0,.25);max-width:96%;padding:28px;width:760px}.title_3200fcfd{color:#1b3752;font-size:24px;font-weight:700;margin:0 0 12px;padding-bottom:10px;padding-top:10px;text-align:center}.dropZone_3200fcfd{align-items:center;background:linear-gradient(180deg,rgba(245,243,255,.8),hsla(0,0%,100%,.6));border:2px dashed rgba(72,52,212,.25);border-radius:10px;box-shadow:0 6px 18px rgba(72,52,212,.06);cursor:pointer;display:flex;flex-direction:column;gap:10px;justify-content:center;padding:36px;text-align:center;transition:border-color .18s ease,background .18s ease,box-shadow .18s ease}.dropZoneHover_3200fcfd{background:linear-gradient(180deg,rgba(232,226,255,.95),rgba(245,243,255,.98));border-color:#4834d4;box-shadow:0 8px 28px rgba(72,52,212,.12)}.uploadIcon_3200fcfd{color:#4834d4;display:block;height:64px;width:64px}.hintText_3200fcfd{color:#2f2f2f;font-size:16px;font-weight:600}.instructions_3200fcfd{color:#666;font-size:13px}.browseBtn_3200fcfd{background-color:#4834d4;border:none;border-radius:6px;color:#fff;cursor:pointer;font-weight:600;padding:10px 18px}.footer_3200fcfd{display:flex;gap:10px;justify-content:flex-end;margin-top:18px}.closeBtn_3200fcfd{background:0 0;border:1px solid #ddd;border-radius:6px;color:#333;cursor:pointer;padding:8px 14px}.fileName_3200fcfd{color:#333;font-size:14px;margin-bottom:12px}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvVmFtc2hpa1NoZXR0eS9PbmVEcml2ZSUyMC0lMjBTS1lTRUNVUkUlMjBURUNITk9MT0dJRVMlMjBQUklWQVRFJTIwTElNSVRFRC9EZXNrdG9wL1NreVNlY3VyZS9JbmRlZ2VuZVNoYXJlcG9pbnRTaXRlL3NyYy93ZWJwYXJ0cy9taWdyYXRpb24vY29tcG9uZW50cy9GaWxlVXBsb2FkL0ZpbGVVcGxvYWQubW9kdWxlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsa0JBR0UsMEJBQUEsQ0FLQSw0QkFBQSxDQU5BLE9BQUEsQ0FEQSxjQUFBLENBTUEsWUFDQSxDQUdGLGtDQU5FLGtCQUFBLENBREEsWUFBQSxDQUVBLHNCQWNBLENBVEYsZ0JBQ0UsY0FBQSxDQUVBLGtCQUFBLENBR0EsZUFBQSxDQURBLGFBQUEsQ0FIQSxTQUFBLENBRUEsVUFLQSxDQUdGLHFCQUNFLGVBQUEsQ0FFQSxrQkFBQSxDQUdBLHNDQUFBLENBREEsYUFBQSxDQUhBLFlBQUEsQ0FFQSxXQUVBLENBR0YsZ0JBS0UsYUFBQSxDQUhBLGNBQUEsQ0FFQSxlQUFBLENBSEEsZUFBQSxDQUtBLG1CQUFBLENBQ0EsZ0JBQUEsQ0FKQSxpQkFJQSxDQUdGLG1CQUtFLGtCQUFBLENBTUEsMEVBQUEsQ0FWQSxxQ0FBQSxDQUNBLGtCQUFBLENBVUEseUNBQUEsQ0FIQSxjQUFBLENBTEEsWUFBQSxDQUdBLHFCQUFBLENBQ0EsUUFBQSxDQUZBLHNCQUFBLENBSEEsWUFBQSxDQVVBLGlCQUFBLENBSEEsMkVBR0EsQ0FHRix3QkFFRSw4RUFBQSxDQURBLG9CQUFBLENBRUEseUNBQUEsQ0FHRixxQkFHRSxhQUFBLENBQ0EsYUFBQSxDQUZBLFdBQUEsQ0FEQSxVQUdBLENBR0YsbUJBRUUsYUFBQSxDQURBLGNBQUEsQ0FFQSxlQUFBLENBR0YsdUJBRUUsVUFBQSxDQURBLGNBQ0EsQ0FHRixvQkFDRSx3QkFBQSxDQUVBLFdBQUEsQ0FFQSxpQkFBQSxDQUhBLFVBQUEsQ0FJQSxjQUFBLENBQ0EsZUFBQSxDQUhBLGlCQUdBLENBR0YsaUJBQ0UsWUFBQSxDQUdBLFFBQUEsQ0FGQSx3QkFBQSxDQUNBLGVBQ0EsQ0FHRixtQkFDRSxjQUFBLENBQ0EscUJBQUEsQ0FHQSxpQkFBQSxDQUZBLFVBQUEsQ0FHQSxjQUFBLENBRkEsZ0JBRUEsQ0FHRixtQkFFRSxVQUFBLENBREEsY0FBQSxDQUVBLGtCQUFBIiwiZmlsZSI6IkZpbGVVcGxvYWQubW9kdWxlLmNzcyJ9 */", true);

// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  overlay_3200fcfd: "overlay_3200fcfd",
  modal_3200fcfd: "modal_3200fcfd",
  uploadCard_3200fcfd: "uploadCard_3200fcfd",
  title_3200fcfd: "title_3200fcfd",
  dropZone_3200fcfd: "dropZone_3200fcfd",
  dropZoneHover_3200fcfd: "dropZoneHover_3200fcfd",
  uploadIcon_3200fcfd: "uploadIcon_3200fcfd",
  hintText_3200fcfd: "hintText_3200fcfd",
  instructions_3200fcfd: "instructions_3200fcfd",
  browseBtn_3200fcfd: "browseBtn_3200fcfd",
  footer_3200fcfd: "footer_3200fcfd",
  closeBtn_3200fcfd: "closeBtn_3200fcfd",
  fileName_3200fcfd: "fileName_3200fcfd"
});


/***/ }),

/***/ 2256:
/*!********************************************************************!*\
  !*** ./lib/webparts/migration/components/Footer/Footer.module.css ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/@microsoft/sp-css-loader/node_modules/@microsoft/load-themed-styles/lib-es6/index.js */ 6323);
// Imports


_node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__.loadStyles(".footer_49b3a56d{background-color:#fff;border-top:1px solid #e0e0e0;box-sizing:border-box;font-family:Inter,sans-serif;padding:20px 60px;width:100%}.footerContainer_49b3a56d{margin:0 auto;max-width:1400px}.logoContainer_49b3a56d{align-items:center;display:flex;gap:8px}.logoSquare_49b3a56d{background-color:#1976d2;flex-shrink:0;height:12px;width:12px}.logoText_49b3a56d{color:#1976d2;font-family:Inter,sans-serif;font-size:18px;font-weight:500;letter-spacing:.5px;text-transform:lowercase}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvVmFtc2hpa1NoZXR0eS9PbmVEcml2ZSUyMC0lMjBTS1lTRUNVUkUlMjBURUNITk9MT0dJRVMlMjBQUklWQVRFJTIwTElNSVRFRC9EZXNrdG9wL1NreVNlY3VyZS9JbmRlZ2VuZVNoYXJlcG9pbnRTaXRlL3NyYy93ZWJwYXJ0cy9taWdyYXRpb24vY29tcG9uZW50cy9Gb290ZXIvRm9vdGVyLm1vZHVsZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGlCQUVFLHFCQUFBLENBR0EsNEJBQUEsQ0FEQSxxQkFBQSxDQUVBLDRCQUFBLENBSEEsaUJBQUEsQ0FGQSxVQUtBLENBR0YsMEJBRUUsYUFBQSxDQURBLGdCQUNBLENBR0Ysd0JBRUUsa0JBQUEsQ0FEQSxZQUFBLENBRUEsT0FBQSxDQUdGLHFCQUdFLHdCQUFBLENBQ0EsYUFBQSxDQUZBLFdBQUEsQ0FEQSxVQUdBLENBR0YsbUJBRUUsYUFBQSxDQUVBLDRCQUFBLENBSEEsY0FBQSxDQUVBLGVBQUEsQ0FHQSxtQkFBQSxDQURBLHdCQUNBIiwiZmlsZSI6IkZvb3Rlci5tb2R1bGUuY3NzIn0= */", true);

// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  footer_49b3a56d: "footer_49b3a56d",
  footerContainer_49b3a56d: "footerContainer_49b3a56d",
  logoContainer_49b3a56d: "logoContainer_49b3a56d",
  logoSquare_49b3a56d: "logoSquare_49b3a56d",
  logoText_49b3a56d: "logoText_49b3a56d"
});


/***/ }),

/***/ 4304:
/*!********************************************************************!*\
  !*** ./lib/webparts/migration/components/Header/Header.module.css ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/@microsoft/sp-css-loader/node_modules/@microsoft/load-themed-styles/lib-es6/index.js */ 6323);
// Imports


_node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__.loadStyles(".header_e245bf59{background:linear-gradient(90deg,#ff6b9d 0,#c44569 30%,#6c5ce7 70%,#4834d4);box-sizing:border-box;color:#fff;font-family:Inter,sans-serif;padding:40px 60px;width:100%}.headerContent_e245bf59{align-items:flex-start;display:flex;justify-content:space-between;margin:0 auto;max-width:1400px}.leftSection_e245bf59{flex:1}.companyName_e245bf59{color:#fff;font-family:Inter,sans-serif;font-size:48px;font-weight:700;margin:0 0 10px}.description_e245bf59{font-weight:400;margin:0 0 20px;opacity:.95}.addFileButton_e245bf59,.description_e245bf59{color:#fff;font-family:Inter,sans-serif;font-size:16px}.addFileButton_e245bf59{background-color:#4834d4;border:none;border-radius:4px;cursor:pointer;font-weight:500;padding:12px 24px;transition:background-color .3s}.addFileButton_e245bf59:hover{background-color:#3d2db8}.rightSection_e245bf59{align-items:flex-end;display:flex;flex-direction:column;gap:20px}.leadership_e245bf59{color:#fff;font-family:Inter,sans-serif;font-size:18px;font-weight:500}.searchContainer_e245bf59{align-items:center;background-color:#fff;border-radius:4px;display:flex;min-width:300px;padding:8px 16px}.searchIcon_e245bf59{flex-shrink:0;height:18px;margin-right:10px;width:18px}.searchInput_e245bf59{background:0 0;border:none;color:#333;flex:1;font-family:Inter,sans-serif;font-size:16px;font-weight:400;outline:0}.searchInput:-ms-input-placeholder{color:#999}.searchInput_e245bf59:-ms-input-placeholder{color:#999}.searchInput_e245bf59::placeholder{color:#999}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvVmFtc2hpa1NoZXR0eS9PbmVEcml2ZSUyMC0lMjBTS1lTRUNVUkUlMjBURUNITk9MT0dJRVMlMjBQUklWQVRFJTIwTElNSVRFRC9EZXNrdG9wL1NreVNlY3VyZS9JbmRlZ2VuZVNoYXJlcG9pbnRTaXRlL3NyYy93ZWJwYXJ0cy9taWdyYXRpb24vY29tcG9uZW50cy9IZWFkZXIvSGVhZGVyLm1vZHVsZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGlCQUVFLDJFQUFBLENBR0EscUJBQUEsQ0FEQSxVQUFBLENBRUEsNEJBQUEsQ0FIQSxpQkFBQSxDQUZBLFVBS0EsQ0FHRix3QkFHRSxzQkFBQSxDQUZBLFlBQUEsQ0FDQSw2QkFBQSxDQUdBLGFBQUEsQ0FEQSxnQkFDQSxDQUdGLHNCQUNFLE1BQUEsQ0FHRixzQkFJRSxVQUFBLENBQ0EsNEJBQUEsQ0FKQSxjQUFBLENBQ0EsZUFBQSxDQUNBLGVBRUEsQ0FHRixzQkFLRSxlQUFBLENBSEEsZUFBQSxDQUVBLFdBRUEsQ0FHRiw4Q0FORSxVQUFBLENBR0EsNEJBQUEsQ0FMQSxjQWtCQSxDQVZGLHdCQUNFLHdCQUFBLENBRUEsV0FBQSxDQUlBLGlCQUFBLENBREEsY0FBQSxDQUVBLGVBQUEsQ0FKQSxpQkFBQSxDQU1BLCtCQUFBLENBRUEsOEJBQ0Usd0JBQUEsQ0FJSix1QkFHRSxvQkFBQSxDQUZBLFlBQUEsQ0FDQSxxQkFBQSxDQUVBLFFBQUEsQ0FHRixxQkFFRSxVQUFBLENBRUEsNEJBQUEsQ0FIQSxjQUFBLENBRUEsZUFDQSxDQUdGLDBCQUVFLGtCQUFBLENBQ0EscUJBQUEsQ0FDQSxpQkFBQSxDQUhBLFlBQUEsQ0FLQSxlQUFBLENBREEsZ0JBQ0EsQ0FHRixxQkFJRSxhQUFBLENBRkEsV0FBQSxDQUNBLGlCQUFBLENBRkEsVUFHQSxDQUdGLHNCQU1FLGNBQUEsQ0FMQSxXQUFBLENBSUEsVUFBQSxDQUZBLE1BQUEsQ0FJQSw0QkFBQSxDQUhBLGNBQUEsQ0FJQSxlQUFBLENBTkEsU0FNQSxDQUVBLG1DQUNFLFVBQUEsQ0FERiw0Q0FDRSxVQUFBLENBREYsbUNBQ0UsVUFBQSIsImZpbGUiOiJIZWFkZXIubW9kdWxlLmNzcyJ9 */", true);

// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  header_e245bf59: "header_e245bf59",
  headerContent_e245bf59: "headerContent_e245bf59",
  leftSection_e245bf59: "leftSection_e245bf59",
  companyName_e245bf59: "companyName_e245bf59",
  description_e245bf59: "description_e245bf59",
  addFileButton_e245bf59: "addFileButton_e245bf59",
  rightSection_e245bf59: "rightSection_e245bf59",
  leadership_e245bf59: "leadership_e245bf59",
  searchContainer_e245bf59: "searchContainer_e245bf59",
  searchIcon_e245bf59: "searchIcon_e245bf59",
  searchInput_e245bf59: "searchInput_e245bf59",
  searchInput: "searchInput"
});


/***/ }),

/***/ 8856:
/*!********************************************************************************!*\
  !*** ./lib/webparts/migration/components/MetadataForm/MetadataForm.module.css ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/@microsoft/sp-css-loader/node_modules/@microsoft/load-themed-styles/lib-es6/index.js */ 6323);
// Imports


_node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__.loadStyles(".formWrapper_6d4eb6a4{background:linear-gradient(180deg,#f7f9fb,#fff);border-radius:12px;box-shadow:0 18px 40px rgba(31,43,70,.08);display:flex;flex-direction:column;margin:22px auto;max-height:calc(100vh - 110px);overflow:hidden;padding:24px 20px 24px 28px;position:relative;width:min(820px,96vw)}.formInner_6d4eb6a4{-webkit-overflow-scrolling:touch;flex:1 1 auto;max-height:calc(100vh - 220px);min-height:0;overflow-y:auto;padding-left:8px;padding-right:8px}.note_6d4eb6a4{color:#444;font-size:13px;margin-bottom:6px}.headerBar_6d4eb6a4{align-items:center;background:0 0;display:flex;gap:12px;padding:10px 0;position:relative}.cardMeta_6d4eb6a4{background:0 0;padding:16px}.field_6d4eb6a4{display:flex;flex-direction:column}.title_6d4eb6a4{color:#0f2133;font-size:28px;font-weight:800;margin:0}.titleWrap_6d4eb6a4{align-items:flex-start;display:flex;flex-direction:column}.subtitle_6d4eb6a4{color:#5b6b7a;font-size:13px;font-weight:600;margin-top:6px}.closeBtn_6d4eb6a4{align-items:center;background:#fff;border:1px solid rgba(15,33,51,.06);border-radius:50%;box-shadow:0 6px 18px rgba(15,33,51,.06);color:#0f2133;cursor:pointer;display:inline-flex;font-size:18px;height:44px;justify-content:center;line-height:1;position:absolute;right:20px;top:24px;width:44px;z-index:40}.fieldFull_6d4eb6a4{display:flex;flex-direction:column;grid-column:1/-1}.label_6d4eb6a4{color:#1b3752;font-size:15px;font-weight:700;margin-bottom:8px}.input_6d4eb6a4{background:#fff;border:1px solid rgba(15,33,51,.12);border-radius:8px;color:#6b7280;font-size:15px;font-weight:500;padding:10px 12px;transition:border-color .14s,box-shadow .14s,transform 60ms}.input:-ms-input-placeholder{color:#9ca3af;opacity:1}.input_6d4eb6a4:-ms-input-placeholder{color:#9ca3af;opacity:1}.input_6d4eb6a4::placeholder{color:#9ca3af;opacity:1}.input_6d4eb6a4:focus{border-color:rgba(108,92,231,.9);box-shadow:0 12px 30px rgba(76,63,203,.08);outline:0;transform:translateY(-2px)}.textarea_6d4eb6a4{border:1px solid rgba(15,33,51,.12);border-radius:8px;color:#6b7280;font-size:15px;font-weight:500;min-height:110px;padding:14px;resize:vertical}.textarea:-ms-input-placeholder{color:#9ca3af;opacity:1}.textarea_6d4eb6a4:-ms-input-placeholder{color:#9ca3af;opacity:1}.textarea_6d4eb6a4::placeholder{color:#9ca3af;opacity:1}.textarea_6d4eb6a4:focus{border-color:#6c5ce7;box-shadow:0 8px 24px rgba(108,92,231,.08);outline:0}.grid_6d4eb6a4{align-items:start;display:grid;gap:16px 18px;grid-template-columns:1fr 1fr}.actions_6d4eb6a4{background:linear-gradient(180deg,hsla(0,0%,100%,.95),#fff);bottom:0;display:flex;justify-content:flex-end;margin-top:8px;padding-bottom:8px;padding-top:8px;position:sticky;z-index:5}.submitBtn_6d4eb6a4{background:linear-gradient(90deg,#6c5ce7,#4834d4);border:none;border-radius:10px;box-shadow:0 8px 20px rgba(72,52,212,.14);color:#fff;cursor:pointer;font-size:15px;font-weight:700;padding:12px 20px}.submitBtn_6d4eb6a4:hover{transform:translateY(-2px)}@media (max-width:640px){.grid_6d4eb6a4{grid-template-columns:1fr}}.formInner_6d4eb6a4::-webkit-scrollbar{width:8px}.formInner_6d4eb6a4::-webkit-scrollbar-thumb{backdrop-filter:blur(2px);background:rgba(108,92,231,.32);border-radius:8px}.formInner_6d4eb6a4::-webkit-scrollbar-thumb:hover{background:rgba(108,92,231,.46)}.formInner_6d4eb6a4::-webkit-scrollbar-track{background:rgba(15,33,51,.03)}.formInner_6d4eb6a4{scrollbar-color:rgba(108,92,231,.32) rgba(15,33,51,.03);scrollbar-width:thin}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvVmFtc2hpa1NoZXR0eS9PbmVEcml2ZSUyMC0lMjBTS1lTRUNVUkUlMjBURUNITk9MT0dJRVMlMjBQUklWQVRFJTIwTElNSVRFRC9EZXNrdG9wL1NreVNlY3VyZS9JbmRlZ2VuZVNoYXJlcG9pbnRTaXRlL3NyYy93ZWJwYXJ0cy9taWdyYXRpb24vY29tcG9uZW50cy9NZXRhZGF0YUZvcm0vTWV0YWRhdGFGb3JtLm1vZHVsZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHNCQUNFLCtDQUFBLENBRUEsa0JBQUEsQ0FHQSx5Q0FBQSxDQUdBLFlBQUEsQ0FDQSxxQkFBQSxDQUxBLGdCQUFBLENBRUEsOEJBQUEsQ0FDQSxlQUFBLENBTkEsMkJBQUEsQ0FTQSxpQkFBQSxDQVBBLHFCQU9BLENBSUYsb0JBSUUsZ0NBQUEsQ0FIQSxhQUFBLENBTUEsOEJBQUEsQ0FMQSxZQUFBLENBQ0EsZUFBQSxDQUdBLGdCQUFBLENBREEsaUJBRUEsQ0FHRixlQUVFLFVBQUEsQ0FEQSxjQUFBLENBRUEsaUJBQUEsQ0FJRixvQkFJRSxrQkFBQSxDQUhBLGNBQUEsQ0FFQSxZQUFBLENBRUEsUUFBQSxDQUhBLGNBQUEsQ0FJQSxpQkFBQSxDQUdGLG1CQUVFLGNBQUEsQ0FEQSxZQUNBLENBR0YsZ0JBQ0UsWUFBQSxDQUNBLHFCQUFBLENBR0YsZ0JBSUUsYUFBQSxDQUhBLGNBQUEsQ0FFQSxlQUFBLENBREEsUUFFQSxDQUdGLG9CQUdFLHNCQUFBLENBRkEsWUFBQSxDQUNBLHFCQUNBLENBR0YsbUJBRUUsYUFBQSxDQURBLGNBQUEsQ0FHQSxlQUFBLENBREEsY0FDQSxDQUdGLG1CQU9FLGtCQUFBLENBTkEsZUFBQSxDQUNBLG1DQUFBLENBT0EsaUJBQUEsQ0FDQSx3Q0FBQSxDQVBBLGFBQUEsQ0FVQSxjQUFBLENBUEEsbUJBQUEsQ0FLQSxjQUFBLENBTkEsV0FBQSxDQUdBLHNCQUFBLENBSUEsYUFBQSxDQUVBLGlCQUFBLENBRUEsVUFBQSxDQURBLFFBQUEsQ0FYQSxVQUFBLENBYUEsVUFBQSxDQUtGLG9CQUVFLFlBQUEsQ0FDQSxxQkFBQSxDQUZBLGdCQUVBLENBR0YsZ0JBRUUsYUFBQSxDQURBLGNBQUEsQ0FHQSxlQUFBLENBREEsaUJBQ0EsQ0FHRixnQkFLRSxlQUFBLENBRkEsbUNBQUEsQ0FDQSxpQkFBQSxDQUVBLGFBQUEsQ0FKQSxjQUFBLENBS0EsZUFBQSxDQU5BLGlCQUFBLENBT0EsMkRBQUEsQ0FFQSw2QkFDRSxhQUFBLENBQ0EsU0FBQSxDQUZGLHNDQUNFLGFBQUEsQ0FDQSxTQUFBLENBRkYsNkJBQ0UsYUFBQSxDQUNBLFNBQUEsQ0FHRixzQkFDRSxnQ0FBQSxDQUNBLDBDQUFBLENBQ0EsU0FBQSxDQUNBLDBCQUFBLENBSUosbUJBS0UsbUNBQUEsQ0FDQSxpQkFBQSxDQUNBLGFBQUEsQ0FKQSxjQUFBLENBS0EsZUFBQSxDQU5BLGdCQUFBLENBREEsWUFBQSxDQUdBLGVBSUEsQ0FFQSxnQ0FDRSxhQUFBLENBQ0EsU0FBQSxDQUZGLHlDQUNFLGFBQUEsQ0FDQSxTQUFBLENBRkYsZ0NBQ0UsYUFBQSxDQUNBLFNBQUEsQ0FHRix5QkFDRSxvQkFBQSxDQUNBLDBDQUFBLENBQ0EsU0FBQSxDQUlKLGVBSUUsaUJBQUEsQ0FIQSxZQUFBLENBRUEsYUFBQSxDQURBLDZCQUVBLENBS0Ysa0JBTUUsMkRBQUEsQ0FEQSxRQUFBLENBSkEsWUFBQSxDQUNBLHdCQUFBLENBQ0EsY0FBQSxDQUtBLGtCQUFBLENBREEsZUFBQSxDQUhBLGVBQUEsQ0FLQSxTQUFBLENBR0Ysb0JBRUUsaURBQUEsQ0FHQSxXQUFBLENBQ0Esa0JBQUEsQ0FHQSx5Q0FBQSxDQU5BLFVBQUEsQ0FJQSxjQUFBLENBSEEsY0FBQSxDQUlBLGVBQUEsQ0FQQSxpQkFRQSxDQUVBLDBCQUNFLDBCQUFBLENBSUoseUJBQ0UsZUFDRSx5QkFBQSxDQUFBLENBS0osdUNBQ0UsU0FBQSxDQUVGLDZDQUdFLHlCQUFBLENBRkEsK0JBQUEsQ0FDQSxpQkFDQSxDQUVGLG1EQUNFLCtCQUFBLENBRUYsNkNBQ0UsNkJBQUEsQ0FJRixvQkFDRSx1REFBQSxDQUNBLG9CQUFBIiwiZmlsZSI6Ik1ldGFkYXRhRm9ybS5tb2R1bGUuY3NzIn0= */", true);

// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  formWrapper_6d4eb6a4: "formWrapper_6d4eb6a4",
  formInner_6d4eb6a4: "formInner_6d4eb6a4",
  note_6d4eb6a4: "note_6d4eb6a4",
  headerBar_6d4eb6a4: "headerBar_6d4eb6a4",
  cardMeta_6d4eb6a4: "cardMeta_6d4eb6a4",
  field_6d4eb6a4: "field_6d4eb6a4",
  title_6d4eb6a4: "title_6d4eb6a4",
  titleWrap_6d4eb6a4: "titleWrap_6d4eb6a4",
  subtitle_6d4eb6a4: "subtitle_6d4eb6a4",
  closeBtn_6d4eb6a4: "closeBtn_6d4eb6a4",
  fieldFull_6d4eb6a4: "fieldFull_6d4eb6a4",
  label_6d4eb6a4: "label_6d4eb6a4",
  input_6d4eb6a4: "input_6d4eb6a4",
  input: "input",
  textarea_6d4eb6a4: "textarea_6d4eb6a4",
  textarea: "textarea",
  grid_6d4eb6a4: "grid_6d4eb6a4",
  actions_6d4eb6a4: "actions_6d4eb6a4",
  submitBtn_6d4eb6a4: "submitBtn_6d4eb6a4"
});


/***/ }),

/***/ 4843:
/*!****************************************************************!*\
  !*** ./lib/webparts/migration/components/Migration.module.css ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/@microsoft/sp-css-loader/node_modules/@microsoft/load-themed-styles/lib-es6/index.js */ 6323);
// Imports


_node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__.loadStyles(".migration_c01701c8{display:flex;flex-direction:column;font-family:Inter,sans-serif;margin:0;min-height:100vh;padding:0;width:100%}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvVmFtc2hpa1NoZXR0eS9PbmVEcml2ZSUyMC0lMjBTS1lTRUNVUkUlMjBURUNITk9MT0dJRVMlMjBQUklWQVRFJTIwTElNSVRFRC9EZXNrdG9wL1NreVNlY3VyZS9JbmRlZ2VuZVNoYXJlcG9pbnRTaXRlL3NyYy93ZWJwYXJ0cy9taWdyYXRpb24vY29tcG9uZW50cy9NaWdyYXRpb24ubW9kdWxlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBR0UsWUFBQSxDQUNBLHFCQUFBLENBR0EsNEJBQUEsQ0FGQSxRQUFBLENBSEEsZ0JBQUEsQ0FJQSxTQUFBLENBTEEsVUFNQSIsImZpbGUiOiJNaWdyYXRpb24ubW9kdWxlLmNzcyJ9 */", true);

// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  migration_c01701c8: "migration_c01701c8"
});


/***/ }),

/***/ 4538:
/*!****************************************************************************!*\
  !*** ./lib/webparts/migration/components/Navigation/Navigation.module.css ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/@microsoft/sp-css-loader/node_modules/@microsoft/load-themed-styles/lib-es6/index.js */ 6323);
// Imports


_node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__.loadStyles(".navigation_e0b26b5e{background-color:#e3f2fd;box-shadow:0 2px 4px rgba(0,0,0,.1);font-family:Inter,sans-serif;padding:0;width:100%}.navContainer_e0b26b5e{align-items:center;display:flex;gap:0;margin:0 auto;max-width:1400px;padding:0 60px}.navItem_e0b26b5e{border-bottom:3px solid transparent;color:#424242;font-family:Inter,sans-serif;font-size:16px;font-weight:500;padding:16px 24px;text-decoration:none;transition:background-color .3s}.navItem_e0b26b5e:hover{background-color:hsla(0,0%,100%,.5)}.navItem_e0b26b5e.active_e0b26b5e{background-color:#81d4fa;border-bottom:3px solid #1976d2;color:#424242}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvVmFtc2hpa1NoZXR0eS9PbmVEcml2ZSUyMC0lMjBTS1lTRUNVUkUlMjBURUNITk9MT0dJRVMlMjBQUklWQVRFJTIwTElNSVRFRC9EZXNrdG9wL1NreVNlY3VyZS9JbmRlZ2VuZVNoYXJlcG9pbnRTaXRlL3NyYy93ZWJwYXJ0cy9taWdyYXRpb24vY29tcG9uZW50cy9OYXZpZ2F0aW9uL05hdmlnYXRpb24ubW9kdWxlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEscUJBRUUsd0JBQUEsQ0FFQSxtQ0FBQSxDQUNBLDRCQUFBLENBRkEsU0FBQSxDQUZBLFVBSUEsQ0FHRix1QkFFRSxrQkFBQSxDQURBLFlBQUEsQ0FLQSxLQUFBLENBRkEsYUFBQSxDQURBLGdCQUFBLENBRUEsY0FDQSxDQUdGLGtCQVFFLG1DQUFBLENBTEEsYUFBQSxDQUdBLDRCQUFBLENBRkEsY0FBQSxDQUNBLGVBQUEsQ0FKQSxpQkFBQSxDQUNBLG9CQUFBLENBS0EsK0JBQ0EsQ0FFQSx3QkFDRSxtQ0FBQSxDQUdGLGtDQUNFLHdCQUFBLENBRUEsK0JBQUEsQ0FEQSxhQUNBIiwiZmlsZSI6Ik5hdmlnYXRpb24ubW9kdWxlLmNzcyJ9 */", true);

// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  navigation_e0b26b5e: "navigation_e0b26b5e",
  navContainer_e0b26b5e: "navContainer_e0b26b5e",
  navItem_e0b26b5e: "navItem_e0b26b5e",
  active_e0b26b5e: "active_e0b26b5e"
});


/***/ }),

/***/ 2408:
/*!**************************************************************************************!*\
  !*** ./lib/webparts/migration/components/QuestionSection/QuestionSection.module.css ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/@microsoft/sp-css-loader/node_modules/@microsoft/load-themed-styles/lib-es6/index.js */ 6323);
// Imports


_node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__.loadStyles(".questionSection_fc045cad{background:linear-gradient(90deg,#ff6b9d 0,#c44569 30%,#6c5ce7 70%,#4834d4);box-sizing:border-box;font-family:Inter,sans-serif;padding:40px 60px;width:100%}.questionContainer_fc045cad{align-items:center;display:flex;gap:30px;justify-content:space-between;margin:0 auto;max-width:1400px}.leftPrompt_fc045cad{flex-shrink:0}.promptText_fc045cad{color:#fff;font-family:Inter,sans-serif;font-size:20px;font-weight:500;margin:0;white-space:nowrap}.rightInput_fc045cad{flex:1;max-width:600px}.questionInput_fc045cad{background-color:#fff;border:none;border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,.1);box-sizing:border-box;color:#333;font-family:Inter,sans-serif;font-size:16px;font-weight:400;outline:0;padding:16px 20px;width:100%}.questionInput:-ms-input-placeholder{color:#999}.questionInput_fc045cad:-ms-input-placeholder{color:#999}.questionInput_fc045cad::placeholder{color:#999}.questionInput_fc045cad:focus{box-shadow:0 2px 12px rgba(0,0,0,.15)}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvVmFtc2hpa1NoZXR0eS9PbmVEcml2ZSUyMC0lMjBTS1lTRUNVUkUlMjBURUNITk9MT0dJRVMlMjBQUklWQVRFJTIwTElNSVRFRC9EZXNrdG9wL1NreVNlY3VyZS9JbmRlZ2VuZVNoYXJlcG9pbnRTaXRlL3NyYy93ZWJwYXJ0cy9taWdyYXRpb24vY29tcG9uZW50cy9RdWVzdGlvblNlY3Rpb24vUXVlc3Rpb25TZWN0aW9uLm1vZHVsZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBCQUVFLDJFQUFBLENBRUEscUJBQUEsQ0FDQSw0QkFBQSxDQUZBLGlCQUFBLENBRkEsVUFJQSxDQUdGLDRCQUVFLGtCQUFBLENBREEsWUFBQSxDQUtBLFFBQUEsQ0FIQSw2QkFBQSxDQUVBLGFBQUEsQ0FEQSxnQkFFQSxDQUdGLHFCQUNFLGFBQUEsQ0FHRixxQkFFRSxVQUFBLENBR0EsNEJBQUEsQ0FKQSxjQUFBLENBR0EsZUFBQSxDQURBLFFBQUEsQ0FHQSxrQkFBQSxDQUdGLHFCQUNFLE1BQUEsQ0FDQSxlQUFBLENBR0Ysd0JBTUUscUJBQUEsQ0FIQSxXQUFBLENBQ0EsaUJBQUEsQ0FNQSxtQ0FBQSxDQUZBLHFCQUFBLENBREEsVUFBQSxDQUlBLDRCQUFBLENBTkEsY0FBQSxDQU9BLGVBQUEsQ0FIQSxTQUFBLENBUEEsaUJBQUEsQ0FEQSxVQVdBLENBRUEscUNBQ0UsVUFBQSxDQURGLDhDQUNFLFVBQUEsQ0FERixxQ0FDRSxVQUFBLENBR0YsOEJBQ0UscUNBQUEiLCJmaWxlIjoiUXVlc3Rpb25TZWN0aW9uLm1vZHVsZS5jc3MifQ== */", true);

// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  questionSection_fc045cad: "questionSection_fc045cad",
  questionContainer_fc045cad: "questionContainer_fc045cad",
  leftPrompt_fc045cad: "leftPrompt_fc045cad",
  promptText_fc045cad: "promptText_fc045cad",
  rightInput_fc045cad: "rightInput_fc045cad",
  questionInput_fc045cad: "questionInput_fc045cad",
  questionInput: "questionInput"
});


/***/ }),

/***/ 6122:
/*!*********************************************************************!*\
  !*** ./lib/webparts/migration/pages/AboutPage/AboutPage.module.css ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/@microsoft/sp-css-loader/node_modules/@microsoft/load-themed-styles/lib-es6/index.js */ 6323);
// Imports


_node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__.loadStyles(".aboutPage_afa5522c{align-items:center;background-color:#e3f2fd;box-sizing:border-box;display:flex;font-family:Inter,sans-serif;height:330px;justify-content:center;padding:40px 60px;width:100%}.contentContainer_afa5522c{margin:0 auto;max-width:1400px;text-align:center}.contentText_afa5522c{color:#424242;font-family:Inter,sans-serif;font-size:24px;font-weight:400;margin:0 0 30px}.carouselIndicators_afa5522c{display:flex;gap:12px;justify-content:center;margin-top:20px}.dot_afa5522c{background-color:#90caf9;border-radius:50%;cursor:pointer;height:12px;transition:transform .3s,background-color .3s;width:12px}.dot_afa5522c:hover{background-color:#64b5f6;transform:scale(1.2)}.dot_afa5522c.active_afa5522c{background-color:#1976d2}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvVmFtc2hpa1NoZXR0eS9PbmVEcml2ZSUyMC0lMjBTS1lTRUNVUkUlMjBURUNITk9MT0dJRVMlMjBQUklWQVRFJTIwTElNSVRFRC9EZXNrdG9wL1NreVNlY3VyZS9JbmRlZ2VuZVNoYXJlcG9pbnRTaXRlL3NyYy93ZWJwYXJ0cy9taWdyYXRpb24vcGFnZXMvQWJvdXRQYWdlL0Fib3V0UGFnZS5tb2R1bGUuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxvQkFPRSxrQkFBQSxDQUxBLHdCQUFBLENBRUEscUJBQUEsQ0FFQSxZQUFBLENBR0EsNEJBQUEsQ0FKQSxZQUFBLENBR0Esc0JBQUEsQ0FMQSxpQkFBQSxDQUZBLFVBUUEsQ0FHRiwyQkFHRSxhQUFBLENBREEsZ0JBQUEsQ0FEQSxpQkFFQSxDQUdGLHNCQUVFLGFBQUEsQ0FHQSw0QkFBQSxDQUpBLGNBQUEsQ0FHQSxlQUFBLENBREEsZUFFQSxDQUdGLDZCQUNFLFlBQUEsQ0FFQSxRQUFBLENBREEsc0JBQUEsQ0FFQSxlQUFBLENBR0YsY0FJRSx3QkFBQSxDQURBLGlCQUFBLENBRUEsY0FBQSxDQUhBLFdBQUEsQ0FJQSw2Q0FBQSxDQUxBLFVBS0EsQ0FFQSxvQkFFRSx3QkFBQSxDQURBLG9CQUNBLENBR0YsOEJBQ0Usd0JBQUEiLCJmaWxlIjoiQWJvdXRQYWdlLm1vZHVsZS5jc3MifQ== */", true);

// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  aboutPage_afa5522c: "aboutPage_afa5522c",
  contentContainer_afa5522c: "contentContainer_afa5522c",
  contentText_afa5522c: "contentText_afa5522c",
  carouselIndicators_afa5522c: "carouselIndicators_afa5522c",
  dot_afa5522c: "dot_afa5522c",
  active_afa5522c: "active_afa5522c"
});


/***/ }),

/***/ 6130:
/*!*****************************************************************!*\
  !*** ./lib/webparts/migration/pages/BUsPage/BUsPage.module.css ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/@microsoft/sp-css-loader/node_modules/@microsoft/load-themed-styles/lib-es6/index.js */ 6323);
// Imports


_node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__.loadStyles(".busPage_fcea57b1{align-items:center;background-color:#e3f2fd;box-sizing:border-box;display:flex;font-family:Inter,sans-serif;height:330px;justify-content:center;padding:40px 60px;width:100%}.contentContainer_fcea57b1{margin:0 auto;max-width:1400px;width:100%}.buttonsGrid_fcea57b1{display:grid;gap:20px;grid-template-columns:repeat(5,1fr);margin-bottom:15px;margin-left:auto;margin-right:auto;max-width:1000px}.buttonsGrid_fcea57b1 :nth-child(6){grid-column:2}.buttonsGrid_fcea57b1 :nth-child(7){grid-column:3}@media (max-width:1200px){.buttonsGrid_fcea57b1{grid-template-columns:repeat(3,1fr);max-width:600px}.buttonsGrid_fcea57b1 :nth-child(6),.buttonsGrid_fcea57b1 :nth-child(7){grid-column:auto}}@media (max-width:768px){.buttonsGrid_fcea57b1{grid-template-columns:repeat(2,1fr);max-width:400px}.buttonsGrid_fcea57b1 :nth-child(6),.buttonsGrid_fcea57b1 :nth-child(7){grid-column:auto}}.buButton_fcea57b1{align-items:center;background-color:#1976d2;border:none;border-radius:4px;color:#fff;cursor:pointer;display:flex;font-family:Inter,sans-serif;font-size:18px;font-weight:500;justify-content:center;min-height:60px;padding:20px 30px;transition:background-color .3s,transform .2s}.buButton_fcea57b1:hover{background-color:#1565c0;transform:translateY(-2px)}.buButton_fcea57b1:active{transform:translateY(0)}.carouselIndicators_fcea57b1{display:flex;gap:12px;justify-content:center;margin-top:15px}.dot_fcea57b1{background-color:#90caf9;border-radius:50%;cursor:pointer;height:12px;transition:transform .3s,background-color .3s;width:12px}.dot_fcea57b1:hover{background-color:#64b5f6;transform:scale(1.2)}.dot_fcea57b1.active_fcea57b1{background-color:#1976d2;height:14px;width:14px}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvVmFtc2hpa1NoZXR0eS9PbmVEcml2ZSUyMC0lMjBTS1lTRUNVUkUlMjBURUNITk9MT0dJRVMlMjBQUklWQVRFJTIwTElNSVRFRC9EZXNrdG9wL1NreVNlY3VyZS9JbmRlZ2VuZVNoYXJlcG9pbnRTaXRlL3NyYy93ZWJwYXJ0cy9taWdyYXRpb24vcGFnZXMvQlVzUGFnZS9CVXNQYWdlLm1vZHVsZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGtCQU9FLGtCQUFBLENBTEEsd0JBQUEsQ0FFQSxxQkFBQSxDQUVBLFlBQUEsQ0FHQSw0QkFBQSxDQUpBLFlBQUEsQ0FHQSxzQkFBQSxDQUxBLGlCQUFBLENBRkEsVUFRQSxDQUdGLDJCQUVFLGFBQUEsQ0FEQSxnQkFBQSxDQUVBLFVBQUEsQ0FHRixzQkFDRSxZQUFBLENBRUEsUUFBQSxDQURBLG1DQUFBLENBRUEsa0JBQUEsQ0FFQSxnQkFBQSxDQUNBLGlCQUFBLENBRkEsZ0JBRUEsQ0FHQSxvQ0FDRSxhQUFBLENBR0Ysb0NBQ0UsYUFBQSxDQUlGLDBCQW5CRixzQkFvQkksbUNBQUEsQ0FDQSxlQUFBLENBRUEsd0VBRUUsZ0JBQUEsQ0FBQSxDQUlKLHlCQTdCRixzQkE4QkksbUNBQUEsQ0FDQSxlQUFBLENBRUEsd0VBRUUsZ0JBQUEsQ0FBQSxDQUtOLG1CQWFFLGtCQUFBLENBWkEsd0JBQUEsQ0FFQSxXQUFBLENBS0EsaUJBQUEsQ0FOQSxVQUFBLENBT0EsY0FBQSxDQUdBLFlBQUEsQ0FMQSw0QkFBQSxDQUZBLGNBQUEsQ0FDQSxlQUFBLENBUUEsc0JBQUEsQ0FIQSxlQUFBLENBUEEsaUJBQUEsQ0FNQSw2Q0FJQSxDQUVBLHlCQUNFLHdCQUFBLENBQ0EsMEJBQUEsQ0FHRiwwQkFDRSx1QkFBQSxDQUlKLDZCQUNFLFlBQUEsQ0FFQSxRQUFBLENBREEsc0JBQUEsQ0FFQSxlQUFBLENBR0YsY0FJRSx3QkFBQSxDQURBLGlCQUFBLENBRUEsY0FBQSxDQUhBLFdBQUEsQ0FJQSw2Q0FBQSxDQUxBLFVBS0EsQ0FFQSxvQkFFRSx3QkFBQSxDQURBLG9CQUNBLENBR0YsOEJBQ0Usd0JBQUEsQ0FFQSxXQUFBLENBREEsVUFDQSIsImZpbGUiOiJCVXNQYWdlLm1vZHVsZS5jc3MifQ== */", true);

// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  busPage_fcea57b1: "busPage_fcea57b1",
  contentContainer_fcea57b1: "contentContainer_fcea57b1",
  buttonsGrid_fcea57b1: "buttonsGrid_fcea57b1",
  buButton_fcea57b1: "buButton_fcea57b1",
  carouselIndicators_fcea57b1: "carouselIndicators_fcea57b1",
  dot_fcea57b1: "dot_fcea57b1",
  active_fcea57b1: "active_fcea57b1"
});


/***/ }),

/***/ 2936:
/*!***********************************************************************************************!*\
  !*** ./lib/webparts/migration/pages/ClientTestimonialsPage/ClientTestimonialsPage.module.css ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/@microsoft/sp-css-loader/node_modules/@microsoft/load-themed-styles/lib-es6/index.js */ 6323);
// Imports


_node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__.loadStyles(".testimonialsPage_6a9a225d{align-items:center;background-color:#e3f2fd;box-sizing:border-box;display:flex;font-family:Inter,sans-serif;height:330px;justify-content:center;overflow-x:hidden;padding:40px 60px;width:100%}.contentContainer_6a9a225d{box-sizing:border-box;margin:0 auto;max-width:1400px;width:100%}.testimonialsGrid_6a9a225d{box-sizing:border-box;display:grid;gap:15px;grid-template-columns:repeat(5,1fr);margin-bottom:20px;width:100%}@media (max-width:1400px){.testimonialsGrid_6a9a225d{grid-template-columns:repeat(3,1fr)}}@media (max-width:768px){.testimonialsGrid_6a9a225d{grid-template-columns:repeat(2,1fr)}}@media (max-width:480px){.testimonialsGrid_6a9a225d{grid-template-columns:1fr}}.testimonialCard_6a9a225d{align-items:center;background-color:#64b5f6;border-radius:6px;box-sizing:border-box;display:flex;justify-content:center;max-width:100%;min-height:150px;overflow:hidden;padding:30px 15px;text-align:center;width:100%}.testimonialText_6a9a225d{word-wrap:break-word;color:#fff;font-family:Inter,sans-serif;font-size:16px;font-weight:400;line-height:1.5;margin:0;overflow-wrap:break-word}.carouselIndicators_6a9a225d{display:flex;gap:12px;justify-content:center;margin-top:20px}.dot_6a9a225d{background-color:#90caf9;border-radius:50%;cursor:pointer;height:12px;transition:transform .3s,background-color .3s;width:12px}.dot_6a9a225d:hover{background-color:#64b5f6;transform:scale(1.2)}.dot_6a9a225d.active_6a9a225d{background-color:#1976d2;height:14px;width:14px}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvVmFtc2hpa1NoZXR0eS9PbmVEcml2ZSUyMC0lMjBTS1lTRUNVUkUlMjBURUNITk9MT0dJRVMlMjBQUklWQVRFJTIwTElNSVRFRC9EZXNrdG9wL1NreVNlY3VyZS9JbmRlZ2VuZVNoYXJlcG9pbnRTaXRlL3NyYy93ZWJwYXJ0cy9taWdyYXRpb24vcGFnZXMvQ2xpZW50VGVzdGltb25pYWxzUGFnZS9DbGllbnRUZXN0aW1vbmlhbHNQYWdlLm1vZHVsZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDJCQU9FLGtCQUFBLENBTEEsd0JBQUEsQ0FFQSxxQkFBQSxDQUVBLFlBQUEsQ0FHQSw0QkFBQSxDQUpBLFlBQUEsQ0FHQSxzQkFBQSxDQUVBLGlCQUFBLENBUEEsaUJBQUEsQ0FGQSxVQVNBLENBR0YsMkJBSUUscUJBQUEsQ0FGQSxhQUFBLENBREEsZ0JBQUEsQ0FFQSxVQUNBLENBR0YsMkJBTUUscUJBQUEsQ0FMQSxZQUFBLENBRUEsUUFBQSxDQURBLG1DQUFBLENBRUEsa0JBQUEsQ0FDQSxVQUNBLENBRUEsMEJBUkYsMkJBU0ksbUNBQUEsQ0FBQSxDQUdGLHlCQVpGLDJCQWFJLG1DQUFBLENBQUEsQ0FHRix5QkFoQkYsMkJBaUJJLHlCQUFBLENBQUEsQ0FJSiwwQkFLRSxrQkFBQSxDQUpBLHdCQUFBLENBRUEsaUJBQUEsQ0FNQSxxQkFBQSxDQUxBLFlBQUEsQ0FFQSxzQkFBQSxDQUtBLGNBQUEsQ0FKQSxnQkFBQSxDQUtBLGVBQUEsQ0FWQSxpQkFBQSxDQU1BLGlCQUFBLENBRUEsVUFFQSxDQUdGLDBCQU9FLG9CQUFBLENBTEEsVUFBQSxDQUVBLDRCQUFBLENBSEEsY0FBQSxDQUVBLGVBQUEsQ0FHQSxlQUFBLENBREEsUUFBQSxDQUdBLHdCQUFBLENBR0YsNkJBQ0UsWUFBQSxDQUVBLFFBQUEsQ0FEQSxzQkFBQSxDQUVBLGVBQUEsQ0FHRixjQUlFLHdCQUFBLENBREEsaUJBQUEsQ0FFQSxjQUFBLENBSEEsV0FBQSxDQUlBLDZDQUFBLENBTEEsVUFLQSxDQUVBLG9CQUVFLHdCQUFBLENBREEsb0JBQ0EsQ0FHRiw4QkFDRSx3QkFBQSxDQUVBLFdBQUEsQ0FEQSxVQUNBIiwiZmlsZSI6IkNsaWVudFRlc3RpbW9uaWFsc1BhZ2UubW9kdWxlLmNzcyJ9 */", true);

// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  testimonialsPage_6a9a225d: "testimonialsPage_6a9a225d",
  contentContainer_6a9a225d: "contentContainer_6a9a225d",
  testimonialsGrid_6a9a225d: "testimonialsGrid_6a9a225d",
  testimonialCard_6a9a225d: "testimonialCard_6a9a225d",
  testimonialText_6a9a225d: "testimonialText_6a9a225d",
  carouselIndicators_6a9a225d: "carouselIndicators_6a9a225d",
  dot_6a9a225d: "dot_6a9a225d",
  active_6a9a225d: "active_6a9a225d"
});


/***/ }),

/***/ 254:
/*!*****************************************************************************!*\
  !*** ./lib/webparts/migration/pages/CommunityPage/CommunityPage.module.css ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/@microsoft/sp-css-loader/node_modules/@microsoft/load-themed-styles/lib-es6/index.js */ 6323);
// Imports


_node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__.loadStyles(".communityPage_01d0c138{align-items:center;background-color:#e3f2fd;box-sizing:border-box;display:flex;font-family:Inter,sans-serif;height:330px;justify-content:center;padding:40px 60px;width:100%}.contentContainer_01d0c138{box-sizing:border-box;margin:0 auto;max-width:1400px;width:100%}.communitiesGrid_01d0c138{box-sizing:border-box;display:grid;gap:20px;grid-template-columns:repeat(3,1fr);width:100%}@media (max-width:768px){.communitiesGrid_01d0c138{grid-template-columns:repeat(2,1fr)}}@media (max-width:480px){.communitiesGrid_01d0c138{grid-template-columns:1fr}}.communityCard_01d0c138{align-items:center;background-color:#64b5f6;border-radius:6px;box-sizing:border-box;display:flex;justify-content:center;max-width:100%;min-height:150px;overflow:hidden;padding:40px 30px;text-align:center;width:100%}.communityText_01d0c138{word-wrap:break-word;color:#fff;font-family:Inter,sans-serif;font-size:18px;font-weight:500;line-height:1.5;margin:0;overflow-wrap:break-word}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvVmFtc2hpa1NoZXR0eS9PbmVEcml2ZSUyMC0lMjBTS1lTRUNVUkUlMjBURUNITk9MT0dJRVMlMjBQUklWQVRFJTIwTElNSVRFRC9EZXNrdG9wL1NreVNlY3VyZS9JbmRlZ2VuZVNoYXJlcG9pbnRTaXRlL3NyYy93ZWJwYXJ0cy9taWdyYXRpb24vcGFnZXMvQ29tbXVuaXR5UGFnZS9Db21tdW5pdHlQYWdlLm1vZHVsZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHdCQU9FLGtCQUFBLENBTEEsd0JBQUEsQ0FFQSxxQkFBQSxDQUVBLFlBQUEsQ0FHQSw0QkFBQSxDQUpBLFlBQUEsQ0FHQSxzQkFBQSxDQUxBLGlCQUFBLENBRkEsVUFRQSxDQUdGLDJCQUlFLHFCQUFBLENBRkEsYUFBQSxDQURBLGdCQUFBLENBRUEsVUFDQSxDQUdGLDBCQUtFLHFCQUFBLENBSkEsWUFBQSxDQUVBLFFBQUEsQ0FEQSxtQ0FBQSxDQUVBLFVBQ0EsQ0FFQSx5QkFQRiwwQkFRSSxtQ0FBQSxDQUFBLENBR0YseUJBWEYsMEJBWUkseUJBQUEsQ0FBQSxDQUlKLHdCQUtFLGtCQUFBLENBSkEsd0JBQUEsQ0FFQSxpQkFBQSxDQU1BLHFCQUFBLENBTEEsWUFBQSxDQUVBLHNCQUFBLENBS0EsY0FBQSxDQUpBLGdCQUFBLENBS0EsZUFBQSxDQVZBLGlCQUFBLENBTUEsaUJBQUEsQ0FFQSxVQUVBLENBR0Ysd0JBT0Usb0JBQUEsQ0FMQSxVQUFBLENBRUEsNEJBQUEsQ0FIQSxjQUFBLENBRUEsZUFBQSxDQUdBLGVBQUEsQ0FEQSxRQUFBLENBR0Esd0JBQUEiLCJmaWxlIjoiQ29tbXVuaXR5UGFnZS5tb2R1bGUuY3NzIn0= */", true);

// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  communityPage_01d0c138: "communityPage_01d0c138",
  contentContainer_01d0c138: "contentContainer_01d0c138",
  communitiesGrid_01d0c138: "communitiesGrid_01d0c138",
  communityCard_01d0c138: "communityCard_01d0c138",
  communityText_01d0c138: "communityText_01d0c138"
});


/***/ }),

/***/ 9462:
/*!*******************************************************************************!*\
  !*** ./lib/webparts/migration/pages/QuickLinksPage/QuickLinksPage.module.css ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/@microsoft/sp-css-loader/node_modules/@microsoft/load-themed-styles/lib-es6/index.js */ 6323);
// Imports


_node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__.loadStyles(".quickLinksPage_19320504{background-color:#e3f2fd;box-sizing:border-box;font-family:Inter,sans-serif;height:330px;padding:40px 60px;width:100%}.pageContainer_19320504{align-items:center;justify-content:center;max-width:1400px}.pageContainer_19320504,.quickLinksSidebar_19320504{box-sizing:border-box;display:flex;height:100%;margin:0 auto}.quickLinksSidebar_19320504{background-color:#bbdefb;border-radius:6px;flex-direction:column;overflow:hidden;padding:20px 15px;width:300px}@media (max-width:1024px){.quickLinksSidebar_19320504{height:auto;min-height:300px;width:100%}}.sidebarTitle_19320504{border-bottom:2px solid #90caf9;color:#1976d2;flex-shrink:0;font-family:Inter,sans-serif;font-size:18px;font-weight:700;margin:0 0 15px;padding-bottom:12px}.linksList_19320504{flex:1;list-style:none;margin:0;overflow-x:hidden;overflow-y:auto;padding:0}.linkItem_19320504{align-items:center;color:#1976d2;cursor:pointer;display:flex;font-family:Inter,sans-serif;font-size:15px;font-weight:500;padding:8px 0;text-decoration:none;transition:color .3s,transform .2s}.linkItem_19320504:hover{color:#1565c0;transform:translateX(5px)}.linkItem_19320504:active{transform:translateX(3px)}.linkArrow_19320504{color:#1976d2;font-size:18px;font-weight:600;margin-right:10px;transition:color .3s}.linkItem_19320504:hover .linkArrow_19320504{color:#1565c0}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvVmFtc2hpa1NoZXR0eS9PbmVEcml2ZSUyMC0lMjBTS1lTRUNVUkUlMjBURUNITk9MT0dJRVMlMjBQUklWQVRFJTIwTElNSVRFRC9EZXNrdG9wL1NreVNlY3VyZS9JbmRlZ2VuZVNoYXJlcG9pbnRTaXRlL3NyYy93ZWJwYXJ0cy9taWdyYXRpb24vcGFnZXMvUXVpY2tMaW5rc1BhZ2UvUXVpY2tMaW5rc1BhZ2UubW9kdWxlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEseUJBRUUsd0JBQUEsQ0FFQSxxQkFBQSxDQUVBLDRCQUFBLENBREEsWUFBQSxDQUZBLGlCQUFBLENBRkEsVUFLQSxDQUdGLHdCQUtFLGtCQUFBLENBREEsc0JBQUEsQ0FIQSxnQkFNQSxDQUdGLG9EQUpFLHFCQUFBLENBSEEsWUFBQSxDQUlBLFdBQUEsQ0FMQSxhQWtCQSxDQVZGLDRCQUNFLHdCQUFBLENBRUEsaUJBQUEsQ0FLQSxxQkFBQSxDQUNBLGVBQUEsQ0FQQSxpQkFBQSxDQUlBLFdBSUEsQ0FFQSwwQkFaRiw0QkFjSSxXQUFBLENBQ0EsZ0JBQUEsQ0FGQSxVQUVBLENBQUEsQ0FJSix1QkFPRSwrQkFBQSxDQUpBLGFBQUEsQ0FLQSxhQUFBLENBSkEsNEJBQUEsQ0FIQSxjQUFBLENBQ0EsZUFBQSxDQUdBLGVBQUEsQ0FDQSxtQkFFQSxDQUdGLG9CQUlFLE1BQUEsQ0FIQSxlQUFBLENBRUEsUUFBQSxDQUdBLGlCQUFBLENBREEsZUFBQSxDQUhBLFNBSUEsQ0FHRixtQkFFRSxrQkFBQSxDQUdBLGFBQUEsQ0FLQSxjQUFBLENBVEEsWUFBQSxDQU9BLDRCQUFBLENBRkEsY0FBQSxDQUNBLGVBQUEsQ0FKQSxhQUFBLENBQ0Esb0JBQUEsQ0FLQSxrQ0FDQSxDQUVBLHlCQUNFLGFBQUEsQ0FDQSx5QkFBQSxDQUdGLDBCQUNFLHlCQUFBLENBSUosb0JBSUUsYUFBQSxDQURBLGNBQUEsQ0FEQSxlQUFBLENBREEsaUJBQUEsQ0FJQSxvQkFBQSxDQUdGLDZDQUNFLGFBQUEiLCJmaWxlIjoiUXVpY2tMaW5rc1BhZ2UubW9kdWxlLmNzcyJ9 */", true);

// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  quickLinksPage_19320504: "quickLinksPage_19320504",
  pageContainer_19320504: "pageContainer_19320504",
  quickLinksSidebar_19320504: "quickLinksSidebar_19320504",
  sidebarTitle_19320504: "sidebarTitle_19320504",
  linksList_19320504: "linksList_19320504",
  linkItem_19320504: "linkItem_19320504",
  linkArrow_19320504: "linkArrow_19320504"
});


/***/ }),

/***/ 2110:
/*!***********************************************************************************!*\
  !*** ./lib/webparts/migration/pages/ServiceLinesPage/ServiceLinesPage.module.css ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/@microsoft/sp-css-loader/node_modules/@microsoft/load-themed-styles/lib-es6/index.js */ 6323);
// Imports


_node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__.loadStyles(".serviceLinesPage_12ef78dc{align-items:center;background-color:#e3f2fd;box-sizing:border-box;display:flex;font-family:Inter,sans-serif;height:330px;justify-content:center;padding:40px 60px;width:100%}.contentContainer_12ef78dc{margin:0 auto;max-width:1400px;width:100%}.buttonsGrid_12ef78dc{display:grid;gap:20px;grid-template-columns:repeat(5,1fr);margin-bottom:15px;margin-left:auto;margin-right:auto;max-width:1000px}.buttonsGrid_12ef78dc :nth-child(6){grid-column:2}.buttonsGrid_12ef78dc :nth-child(7){grid-column:3}@media (max-width:1200px){.buttonsGrid_12ef78dc{grid-template-columns:repeat(3,1fr);max-width:600px}.buttonsGrid_12ef78dc :nth-child(6),.buttonsGrid_12ef78dc :nth-child(7){grid-column:auto}}@media (max-width:768px){.buttonsGrid_12ef78dc{grid-template-columns:repeat(2,1fr);max-width:400px}.buttonsGrid_12ef78dc :nth-child(6),.buttonsGrid_12ef78dc :nth-child(7){grid-column:auto}}.slButton_12ef78dc{align-items:center;background-color:#1976d2;border:none;border-radius:4px;color:#fff;cursor:pointer;display:flex;font-family:Inter,sans-serif;font-size:18px;font-weight:500;justify-content:center;min-height:60px;padding:20px 30px;transition:background-color .3s,transform .2s}.slButton_12ef78dc:hover{background-color:#1565c0;transform:translateY(-2px)}.slButton_12ef78dc:active{transform:translateY(0)}.carouselIndicators_12ef78dc{display:flex;gap:12px;justify-content:center;margin-top:15px}.dot_12ef78dc{background-color:#90caf9;border-radius:50%;cursor:pointer;height:12px;transition:transform .3s,background-color .3s;width:12px}.dot_12ef78dc:hover{background-color:#64b5f6;transform:scale(1.2)}.dot_12ef78dc.active_12ef78dc{background-color:#1976d2;height:14px;width:14px}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvVmFtc2hpa1NoZXR0eS9PbmVEcml2ZSUyMC0lMjBTS1lTRUNVUkUlMjBURUNITk9MT0dJRVMlMjBQUklWQVRFJTIwTElNSVRFRC9EZXNrdG9wL1NreVNlY3VyZS9JbmRlZ2VuZVNoYXJlcG9pbnRTaXRlL3NyYy93ZWJwYXJ0cy9taWdyYXRpb24vcGFnZXMvU2VydmljZUxpbmVzUGFnZS9TZXJ2aWNlTGluZXNQYWdlLm1vZHVsZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDJCQU9FLGtCQUFBLENBTEEsd0JBQUEsQ0FFQSxxQkFBQSxDQUVBLFlBQUEsQ0FHQSw0QkFBQSxDQUpBLFlBQUEsQ0FHQSxzQkFBQSxDQUxBLGlCQUFBLENBRkEsVUFRQSxDQUdGLDJCQUVFLGFBQUEsQ0FEQSxnQkFBQSxDQUVBLFVBQUEsQ0FHRixzQkFDRSxZQUFBLENBRUEsUUFBQSxDQURBLG1DQUFBLENBRUEsa0JBQUEsQ0FFQSxnQkFBQSxDQUNBLGlCQUFBLENBRkEsZ0JBRUEsQ0FHQSxvQ0FDRSxhQUFBLENBR0Ysb0NBQ0UsYUFBQSxDQUlGLDBCQW5CRixzQkFvQkksbUNBQUEsQ0FDQSxlQUFBLENBRUEsd0VBRUUsZ0JBQUEsQ0FBQSxDQUlKLHlCQTdCRixzQkE4QkksbUNBQUEsQ0FDQSxlQUFBLENBRUEsd0VBRUUsZ0JBQUEsQ0FBQSxDQUtOLG1CQWFFLGtCQUFBLENBWkEsd0JBQUEsQ0FFQSxXQUFBLENBS0EsaUJBQUEsQ0FOQSxVQUFBLENBT0EsY0FBQSxDQUdBLFlBQUEsQ0FMQSw0QkFBQSxDQUZBLGNBQUEsQ0FDQSxlQUFBLENBUUEsc0JBQUEsQ0FIQSxlQUFBLENBUEEsaUJBQUEsQ0FNQSw2Q0FJQSxDQUVBLHlCQUNFLHdCQUFBLENBQ0EsMEJBQUEsQ0FHRiwwQkFDRSx1QkFBQSxDQUlKLDZCQUNFLFlBQUEsQ0FFQSxRQUFBLENBREEsc0JBQUEsQ0FFQSxlQUFBLENBR0YsY0FJRSx3QkFBQSxDQURBLGlCQUFBLENBRUEsY0FBQSxDQUhBLFdBQUEsQ0FJQSw2Q0FBQSxDQUxBLFVBS0EsQ0FFQSxvQkFFRSx3QkFBQSxDQURBLG9CQUNBLENBR0YsOEJBQ0Usd0JBQUEsQ0FFQSxXQUFBLENBREEsVUFDQSIsImZpbGUiOiJTZXJ2aWNlTGluZXNQYWdlLm1vZHVsZS5jc3MifQ== */", true);

// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  serviceLinesPage_12ef78dc: "serviceLinesPage_12ef78dc",
  contentContainer_12ef78dc: "contentContainer_12ef78dc",
  buttonsGrid_12ef78dc: "buttonsGrid_12ef78dc",
  slButton_12ef78dc: "slButton_12ef78dc",
  carouselIndicators_12ef78dc: "carouselIndicators_12ef78dc",
  dot_12ef78dc: "dot_12ef78dc",
  active_12ef78dc: "active_12ef78dc"
});


/***/ }),

/***/ 2278:
/*!*************************************************************************!*\
  !*** ./lib/webparts/migration/pages/WhosWhoPage/WhosWhoPage.module.css ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/@microsoft/sp-css-loader/node_modules/@microsoft/load-themed-styles/lib-es6/index.js */ 6323);
// Imports


_node_modules_microsoft_sp_css_loader_node_modules_microsoft_load_themed_styles_lib_es6_index_js__WEBPACK_IMPORTED_MODULE_0__.loadStyles(".whosWhoPage_e154758d{align-items:center;background-color:#e3f2fd;box-sizing:border-box;display:flex;font-family:Inter,sans-serif;height:330px;justify-content:center;padding:40px 60px;width:100%}.contentContainer_e154758d{box-sizing:border-box;margin:0 auto;max-width:1400px;width:100%}.buFilters_e154758d{display:flex;flex-wrap:wrap;gap:15px;justify-content:center;margin-bottom:20px}.buFilterButton_e154758d{background-color:#90caf9;border:none;border-radius:4px;color:#fff;cursor:pointer;font-family:Inter,sans-serif;font-size:16px;font-weight:500;min-width:80px;padding:12px 24px;transition:background-color .3s,transform .2s}.buFilterButton_e154758d:hover{background-color:#64b5f6;transform:translateY(-2px)}.buFilterButton_e154758d:active{transform:translateY(0)}.buFilterButton_e154758d.active_e154758d{background-color:#1976d2;font-weight:600}.mainContentBlock_e154758d{align-items:center;background-color:#1976d2;border-radius:6px;box-sizing:border-box;display:flex;justify-content:center;margin-bottom:20px;min-height:200px;padding:60px 40px}.contentText_e154758d{color:#fff;font-family:Inter,sans-serif;font-size:20px;font-weight:500;letter-spacing:.5px;margin:0;text-align:center}.carouselIndicators_e154758d{display:flex;gap:12px;justify-content:center;margin-top:20px}.dot_e154758d{background-color:#90caf9;border-radius:50%;cursor:pointer;height:12px;transition:transform .3s,background-color .3s;width:12px}.dot_e154758d:hover{background-color:#64b5f6;transform:scale(1.2)}.dot_e154758d.active_e154758d{background-color:#1976d2;height:14px;width:14px}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvVmFtc2hpa1NoZXR0eS9PbmVEcml2ZSUyMC0lMjBTS1lTRUNVUkUlMjBURUNITk9MT0dJRVMlMjBQUklWQVRFJTIwTElNSVRFRC9EZXNrdG9wL1NreVNlY3VyZS9JbmRlZ2VuZVNoYXJlcG9pbnRTaXRlL3NyYy93ZWJwYXJ0cy9taWdyYXRpb24vcGFnZXMvV2hvc1dob1BhZ2UvV2hvc1dob1BhZ2UubW9kdWxlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsc0JBT0Usa0JBQUEsQ0FMQSx3QkFBQSxDQUVBLHFCQUFBLENBRUEsWUFBQSxDQUdBLDRCQUFBLENBSkEsWUFBQSxDQUdBLHNCQUFBLENBTEEsaUJBQUEsQ0FGQSxVQVFBLENBR0YsMkJBSUUscUJBQUEsQ0FGQSxhQUFBLENBREEsZ0JBQUEsQ0FFQSxVQUNBLENBR0Ysb0JBQ0UsWUFBQSxDQUlBLGNBQUEsQ0FIQSxRQUFBLENBRUEsc0JBQUEsQ0FEQSxrQkFFQSxDQUdGLHlCQUNFLHdCQUFBLENBRUEsV0FBQSxDQUtBLGlCQUFBLENBTkEsVUFBQSxDQU9BLGNBQUEsQ0FGQSw0QkFBQSxDQUZBLGNBQUEsQ0FDQSxlQUFBLENBS0EsY0FBQSxDQVBBLGlCQUFBLENBTUEsNkNBQ0EsQ0FFQSwrQkFDRSx3QkFBQSxDQUNBLDBCQUFBLENBR0YsZ0NBQ0UsdUJBQUEsQ0FHRix5Q0FDRSx3QkFBQSxDQUNBLGVBQUEsQ0FJSiwyQkFNRSxrQkFBQSxDQUxBLHdCQUFBLENBRUEsaUJBQUEsQ0FNQSxxQkFBQSxDQUpBLFlBQUEsQ0FFQSxzQkFBQSxDQUhBLGtCQUFBLENBSUEsZ0JBQUEsQ0FOQSxpQkFPQSxDQUdGLHNCQUVFLFVBQUEsQ0FFQSw0QkFBQSxDQUhBLGNBQUEsQ0FFQSxlQUFBLENBSUEsbUJBQUEsQ0FGQSxRQUFBLENBQ0EsaUJBQ0EsQ0FHRiw2QkFDRSxZQUFBLENBRUEsUUFBQSxDQURBLHNCQUFBLENBRUEsZUFBQSxDQUdGLGNBSUUsd0JBQUEsQ0FEQSxpQkFBQSxDQUVBLGNBQUEsQ0FIQSxXQUFBLENBSUEsNkNBQUEsQ0FMQSxVQUtBLENBRUEsb0JBRUUsd0JBQUEsQ0FEQSxvQkFDQSxDQUdGLDhCQUNFLHdCQUFBLENBRUEsV0FBQSxDQURBLFVBQ0EiLCJmaWxlIjoiV2hvc1dob1BhZ2UubW9kdWxlLmNzcyJ9 */", true);

// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  whosWhoPage_e154758d: "whosWhoPage_e154758d",
  contentContainer_e154758d: "contentContainer_e154758d",
  buFilters_e154758d: "buFilters_e154758d",
  buFilterButton_e154758d: "buFilterButton_e154758d",
  active_e154758d: "active_e154758d",
  mainContentBlock_e154758d: "mainContentBlock_e154758d",
  contentText_e154758d: "contentText_e154758d",
  carouselIndicators_e154758d: "carouselIndicators_e154758d",
  dot_e154758d: "dot_e154758d"
});


/***/ }),

/***/ 236:
/*!**************************************************************************!*\
  !*** ./lib/webparts/migration/components/BUContentArea/BUContentArea.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BUContentArea: () => (/* binding */ BUContentArea)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pages_AboutPage_AboutPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../pages/AboutPage/AboutPage */ 3710);
/* harmony import */ var _pages_ServiceLinesPage_ServiceLinesPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../pages/ServiceLinesPage/ServiceLinesPage */ 6602);
/* harmony import */ var _pages_ClientTestimonialsPage_ClientTestimonialsPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../pages/ClientTestimonialsPage/ClientTestimonialsPage */ 8464);
/* harmony import */ var _pages_WhosWhoPage_WhosWhoPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../pages/WhosWhoPage/WhosWhoPage */ 5338);
/* harmony import */ var _pages_CommunityPage_CommunityPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../pages/CommunityPage/CommunityPage */ 9482);
/* harmony import */ var _pages_QuickLinksPage_QuickLinksPage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../pages/QuickLinksPage/QuickLinksPage */ 3282);
/* harmony import */ var _BUContentArea_module_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./BUContentArea.module.scss */ 8356);








var BUContentArea = function (props) {
    var renderContent = function () {
        switch (props.activePage) {
            case 'about':
                return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_AboutPage_AboutPage__WEBPACK_IMPORTED_MODULE_1__.AboutPage, { context: props.context });
            case 'servicelines':
                return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_ServiceLinesPage_ServiceLinesPage__WEBPACK_IMPORTED_MODULE_2__.ServiceLinesPage, { context: props.context });
            case 'testimonials':
                return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_ClientTestimonialsPage_ClientTestimonialsPage__WEBPACK_IMPORTED_MODULE_3__.ClientTestimonialsPage, { context: props.context });
            case 'whoswho':
                return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_WhosWhoPage_WhosWhoPage__WEBPACK_IMPORTED_MODULE_4__.WhosWhoPage, { context: props.context });
            case 'community':
                return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_CommunityPage_CommunityPage__WEBPACK_IMPORTED_MODULE_5__.CommunityPage, { context: props.context });
            case 'quicklinks':
                return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_QuickLinksPage_QuickLinksPage__WEBPACK_IMPORTED_MODULE_6__.QuickLinksPage, { context: props.context });
            default:
                return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _BUContentArea_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].contentArea },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _BUContentArea_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].contentContainer },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: _BUContentArea_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].contentText },
                            "Content for ",
                            props.activePage,
                            " will be displayed here."))));
        }
    };
    return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, renderContent());
};


/***/ }),

/***/ 8356:
/*!**************************************************************************************!*\
  !*** ./lib/webparts/migration/components/BUContentArea/BUContentArea.module.scss.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
__webpack_require__(/*! ./BUContentArea.module.css */ 8048);
var styles = {
    contentArea: 'contentArea_bb56a150',
    contentContainer: 'contentContainer_bb56a150',
    contentText: 'contentText_bb56a150'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);


/***/ }),

/***/ 7100:
/*!************************************************************************!*\
  !*** ./lib/webparts/migration/components/BUDetailPage/BUDetailPage.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BUDetailPage: () => (/* binding */ BUDetailPage)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BUHeader_BUHeader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BUHeader/BUHeader */ 5042);
/* harmony import */ var _BUNavigation_BUNavigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../BUNavigation/BUNavigation */ 5292);
/* harmony import */ var _BUContentArea_BUContentArea__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../BUContentArea/BUContentArea */ 236);
/* harmony import */ var _BUQuestionSection_BUQuestionSection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../BUQuestionSection/BUQuestionSection */ 1992);
/* harmony import */ var _Footer_Footer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Footer/Footer */ 2508);
/* harmony import */ var _BUDetailPage_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./BUDetailPage.module.scss */ 7108);







var BUDetailPage = function (props) {
    var _a = react__WEBPACK_IMPORTED_MODULE_0__.useState('about'), activePage = _a[0], setActivePage = _a[1];
    var handleNavClick = function (page) {
        setActivePage(page);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _BUDetailPage_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].buDetailPage },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_BUHeader_BUHeader__WEBPACK_IMPORTED_MODULE_1__.BUHeader, { buName: props.buName, onBack: props.onBack }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_BUNavigation_BUNavigation__WEBPACK_IMPORTED_MODULE_2__.BUNavigation, { activePage: activePage, onNavClick: handleNavClick }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_BUContentArea_BUContentArea__WEBPACK_IMPORTED_MODULE_3__.BUContentArea, { activePage: activePage, context: props.context }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_BUQuestionSection_BUQuestionSection__WEBPACK_IMPORTED_MODULE_4__.BUQuestionSection, null),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Footer_Footer__WEBPACK_IMPORTED_MODULE_5__.Footer, null)));
};


/***/ }),

/***/ 7108:
/*!************************************************************************************!*\
  !*** ./lib/webparts/migration/components/BUDetailPage/BUDetailPage.module.scss.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
__webpack_require__(/*! ./BUDetailPage.module.css */ 6320);
var styles = {
    buDetailPage: 'buDetailPage_291ec8d4'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);


/***/ }),

/***/ 5042:
/*!****************************************************************!*\
  !*** ./lib/webparts/migration/components/BUHeader/BUHeader.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BUHeader: () => (/* binding */ BUHeader)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BUHeader_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BUHeader.module.scss */ 1566);


var BUHeader = function (props) {
    var handleBack = function () {
        if (props.onBack) {
            props.onBack();
        }
    };
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _BUHeader_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].buHeader },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _BUHeader_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].headerContent },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _BUHeader_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].leftSection },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { className: _BUHeader_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].backButton, onClick: handleBack },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", { className: _BUHeader_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].backArrow, width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z", fill: "white" }))),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", { className: _BUHeader_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].buName }, props.buName),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: _BUHeader_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].description }, "About the business unit, the services they provide...etc"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { className: _BUHeader_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].addFileButton }, "Add a file")),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _BUHeader_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].rightSection },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _BUHeader_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].buHead }, "BU Head"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _BUHeader_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].searchContainer },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", { className: _BUHeader_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].searchIcon, width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z", fill: "#666" })),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { type: "text", className: _BUHeader_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].searchInput, placeholder: "Search..." }))))));
};


/***/ }),

/***/ 1566:
/*!****************************************************************************!*\
  !*** ./lib/webparts/migration/components/BUHeader/BUHeader.module.scss.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
__webpack_require__(/*! ./BUHeader.module.css */ 3690);
var styles = {
    buHeader: 'buHeader_a61c6b58',
    headerContent: 'headerContent_a61c6b58',
    leftSection: 'leftSection_a61c6b58',
    backButton: 'backButton_a61c6b58',
    backArrow: 'backArrow_a61c6b58',
    buName: 'buName_a61c6b58',
    description: 'description_a61c6b58',
    addFileButton: 'addFileButton_a61c6b58',
    rightSection: 'rightSection_a61c6b58',
    buHead: 'buHead_a61c6b58',
    searchContainer: 'searchContainer_a61c6b58',
    searchIcon: 'searchIcon_a61c6b58',
    searchInput: 'searchInput_a61c6b58'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);


/***/ }),

/***/ 5292:
/*!************************************************************************!*\
  !*** ./lib/webparts/migration/components/BUNavigation/BUNavigation.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BUNavigation: () => (/* binding */ BUNavigation)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BUNavigation_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BUNavigation.module.scss */ 5028);


var BUNavigation = function (props) {
    var navItems = [
        { label: 'About', id: 'about' },
        { label: 'Service Lines', id: 'servicelines' },
        { label: 'Client Testimonials', id: 'testimonials' },
        { label: "Who's Who", id: 'whoswho' },
        { label: 'Community', id: 'community' },
        { label: 'Quick Links', id: 'quicklinks' }
    ];
    var handleClick = function (e, pageId) {
        e.preventDefault();
        props.onNavClick(pageId);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("nav", { className: _BUNavigation_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].buNavigation },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _BUNavigation_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].navContainer }, navItems.map(function (item) { return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { key: item.id, href: "#", onClick: function (e) { return handleClick(e, item.id); }, className: "".concat(_BUNavigation_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].navItem, " ").concat(props.activePage === item.id ? _BUNavigation_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].active : '') }, item.label)); })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _BUNavigation_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dottedLine })));
};


/***/ }),

/***/ 5028:
/*!************************************************************************************!*\
  !*** ./lib/webparts/migration/components/BUNavigation/BUNavigation.module.scss.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
__webpack_require__(/*! ./BUNavigation.module.css */ 3232);
var styles = {
    buNavigation: 'buNavigation_62aa4de0',
    navContainer: 'navContainer_62aa4de0',
    navItem: 'navItem_62aa4de0',
    active: 'active_62aa4de0',
    dottedLine: 'dottedLine_62aa4de0'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);


/***/ }),

/***/ 1992:
/*!**********************************************************************************!*\
  !*** ./lib/webparts/migration/components/BUQuestionSection/BUQuestionSection.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BUQuestionSection: () => (/* binding */ BUQuestionSection)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BUQuestionSection_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BUQuestionSection.module.scss */ 7856);


var BUQuestionSection = function (props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _BUQuestionSection_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].questionSection },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _BUQuestionSection_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].questionContainer },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _BUQuestionSection_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].leftPrompt },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: _BUQuestionSection_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].promptText }, "Ask your question here")),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _BUQuestionSection_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].rightInput },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { type: "text", className: _BUQuestionSection_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].questionInput, placeholder: "Type your question..." })))));
};


/***/ }),

/***/ 7856:
/*!**********************************************************************************************!*\
  !*** ./lib/webparts/migration/components/BUQuestionSection/BUQuestionSection.module.scss.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
__webpack_require__(/*! ./BUQuestionSection.module.css */ 3116);
var styles = {
    questionSection: 'questionSection_6f50e07b',
    questionContainer: 'questionContainer_6f50e07b',
    leftPrompt: 'leftPrompt_6f50e07b',
    promptText: 'promptText_6f50e07b',
    rightInput: 'rightInput_6f50e07b',
    questionInput: 'questionInput_6f50e07b'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);


/***/ }),

/***/ 1384:
/*!**********************************************************************!*\
  !*** ./lib/webparts/migration/components/ContentArea/ContentArea.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContentArea: () => (/* binding */ ContentArea)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pages_AboutPage_AboutPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../pages/AboutPage/AboutPage */ 3710);
/* harmony import */ var _pages_BUsPage_BUsPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../pages/BUsPage/BUsPage */ 9622);
/* harmony import */ var _pages_ClientTestimonialsPage_ClientTestimonialsPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../pages/ClientTestimonialsPage/ClientTestimonialsPage */ 8464);
/* harmony import */ var _pages_WhosWhoPage_WhosWhoPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../pages/WhosWhoPage/WhosWhoPage */ 5338);
/* harmony import */ var _pages_CommunityPage_CommunityPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../pages/CommunityPage/CommunityPage */ 9482);
/* harmony import */ var _pages_QuickLinksPage_QuickLinksPage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../pages/QuickLinksPage/QuickLinksPage */ 3282);
/* harmony import */ var _ContentArea_module_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ContentArea.module.scss */ 6544);








var ContentArea = function (props) {
    var renderContent = function () {
        switch (props.activePage) {
            case 'about':
                return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_AboutPage_AboutPage__WEBPACK_IMPORTED_MODULE_1__.AboutPage, { context: props.context });
            case 'bus':
                return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_BUsPage_BUsPage__WEBPACK_IMPORTED_MODULE_2__.BUsPage, { context: props.context, onBUClick: props.onBUClick });
            case 'testimonials':
                return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_ClientTestimonialsPage_ClientTestimonialsPage__WEBPACK_IMPORTED_MODULE_3__.ClientTestimonialsPage, { context: props.context });
            case 'whoswho':
                return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_WhosWhoPage_WhosWhoPage__WEBPACK_IMPORTED_MODULE_4__.WhosWhoPage, { context: props.context });
            case 'community':
                return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_CommunityPage_CommunityPage__WEBPACK_IMPORTED_MODULE_5__.CommunityPage, { context: props.context });
            case 'quicklinks':
                return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_pages_QuickLinksPage_QuickLinksPage__WEBPACK_IMPORTED_MODULE_6__.QuickLinksPage, { context: props.context });
            default:
                return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _ContentArea_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].contentArea },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _ContentArea_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].contentContainer },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: _ContentArea_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].contentText },
                            "Content for ",
                            props.activePage,
                            " will be displayed here."))));
        }
    };
    return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, renderContent());
};


/***/ }),

/***/ 6544:
/*!**********************************************************************************!*\
  !*** ./lib/webparts/migration/components/ContentArea/ContentArea.module.scss.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
__webpack_require__(/*! ./ContentArea.module.css */ 8052);
var styles = {
    contentArea: 'contentArea_e198527e',
    contentContainer: 'contentContainer_e198527e',
    contentText: 'contentText_e198527e',
    carouselIndicators: 'carouselIndicators_e198527e',
    dot: 'dot_e198527e',
    active: 'active_e198527e'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);


/***/ }),

/***/ 6540:
/*!********************************************************************!*\
  !*** ./lib/webparts/migration/components/FileUpload/FileUpload.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FileUpload: () => (/* binding */ FileUpload),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FileUpload.module.scss */ 3908);
/* harmony import */ var _MetadataForm_MetadataForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../MetadataForm/MetadataForm */ 6732);



var FileUpload = function (props) {
    var _a = react__WEBPACK_IMPORTED_MODULE_0__.useState(false), dragOver = _a[0], setDragOver = _a[1];
    var _b = react__WEBPACK_IMPORTED_MODULE_0__.useState(null), uploadedFile = _b[0], setUploadedFile = _b[1];
    var fileInputRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    var onBrowse = function () {
        var _a;
        (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click();
    };
    var onFileSelected = function (f) {
        var file = f && f.length ? f[0] : undefined;
        if (file) {
            setUploadedFile(file);
            props.onUploaded && props.onUploaded(file);
        }
    };
    var onDrop = function (e) {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length) {
            onFileSelected(e.dataTransfer.files);
        }
    };
    var onFormSubmit = function (data) {
        // data contains form values from MetadataForm
        // Here you would typically send `data` + `uploadedFile` to backend
        console.log('Submitting metadata', data, uploadedFile);
        // close overlay after submit
        props.onClose && props.onClose();
    };
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].overlay },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].modal, role: "dialog", "aria-modal": "true" }, !uploadedFile ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].uploadCard },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("h3", { className: _FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].title }, "Upload Document"),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "".concat(_FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dropZone, " ").concat(dragOver ? _FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dropZoneHover : ''), onDragOver: function (e) { e.preventDefault(); setDragOver(true); }, onDragLeave: function () { return setDragOver(false); }, onDrop: onDrop, onClick: onBrowse, role: "button", "aria-label": "Upload file" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", { className: _FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].uploadIcon, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": true },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M19 15v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M7 9l5-5 5 5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M12 4v12", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].hintText }, "Drag & drop files here"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].instructions }, "Supported formats: PDF, DOCX, PPTX, XLSX, MPP. Click browse or drop a file to start."),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { className: _FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].browseBtn, onClick: function (e) { e.stopPropagation(); onBrowse(); } }, "Browse files"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { ref: fileInputRef, type: "file", style: { display: 'none' }, accept: ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.mpp", onChange: function (e) { return onFileSelected(e.target.files); } })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].footer },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { className: _FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].closeBtn, onClick: function () { return props.onClose && props.onClose(); } }, "Close")))) : (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MetadataForm_MetadataForm__WEBPACK_IMPORTED_MODULE_2__.MetadataForm, { onSubmit: onFormSubmit, onClose: function () { return props.onClose && props.onClose(); } }))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FileUpload);


/***/ }),

/***/ 3908:
/*!********************************************************************************!*\
  !*** ./lib/webparts/migration/components/FileUpload/FileUpload.module.scss.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
__webpack_require__(/*! ./FileUpload.module.css */ 880);
var styles = {
    overlay: 'overlay_3200fcfd',
    modal: 'modal_3200fcfd',
    uploadCard: 'uploadCard_3200fcfd',
    title: 'title_3200fcfd',
    dropZone: 'dropZone_3200fcfd',
    dropZoneHover: 'dropZoneHover_3200fcfd',
    uploadIcon: 'uploadIcon_3200fcfd',
    hintText: 'hintText_3200fcfd',
    instructions: 'instructions_3200fcfd',
    browseBtn: 'browseBtn_3200fcfd',
    footer: 'footer_3200fcfd',
    closeBtn: 'closeBtn_3200fcfd',
    fileName: 'fileName_3200fcfd'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);


/***/ }),

/***/ 2508:
/*!************************************************************!*\
  !*** ./lib/webparts/migration/components/Footer/Footer.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Footer: () => (/* binding */ Footer)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Footer_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Footer.module.scss */ 2244);


var Footer = function (props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("footer", { className: _Footer_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].footer },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _Footer_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].footerContainer },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _Footer_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].logoContainer },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _Footer_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].logoSquare }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: _Footer_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].logoText }, "indegene")))));
};


/***/ }),

/***/ 2244:
/*!************************************************************************!*\
  !*** ./lib/webparts/migration/components/Footer/Footer.module.scss.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
__webpack_require__(/*! ./Footer.module.css */ 2256);
var styles = {
    footer: 'footer_49b3a56d',
    footerContainer: 'footerContainer_49b3a56d',
    logoContainer: 'logoContainer_49b3a56d',
    logoSquare: 'logoSquare_49b3a56d',
    logoText: 'logoText_49b3a56d'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);


/***/ }),

/***/ 2300:
/*!************************************************************!*\
  !*** ./lib/webparts/migration/components/Header/Header.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Header: () => (/* binding */ Header)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Header_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Header.module.scss */ 7716);
/* harmony import */ var _FileUpload_FileUpload__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../FileUpload/FileUpload */ 6540);




var Header = function (props) {
    var _a = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false), showUploader = _a[0], setShowUploader = _a[1];
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _Header_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].header },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _Header_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].headerContent },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _Header_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].leftSection },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", { className: _Header_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].companyName }, "Indegene"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: _Header_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].description }, "About Indegene, the services they provide...etc"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { className: _Header_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].addFileButton, onClick: function () { return setShowUploader(true); } }, "Add a file")),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _Header_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].rightSection },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _Header_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].leadership }, "Leadership"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _Header_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].searchContainer },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", { className: _Header_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].searchIcon, width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z", fill: "#666" })),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { type: "text", className: _Header_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].searchInput, placeholder: "Search..." })))),
        showUploader && (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_FileUpload_FileUpload__WEBPACK_IMPORTED_MODULE_2__.FileUpload, { onClose: function () { return setShowUploader(false); } }))));
};


/***/ }),

/***/ 7716:
/*!************************************************************************!*\
  !*** ./lib/webparts/migration/components/Header/Header.module.scss.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
__webpack_require__(/*! ./Header.module.css */ 4304);
var styles = {
    header: 'header_e245bf59',
    headerContent: 'headerContent_e245bf59',
    leftSection: 'leftSection_e245bf59',
    companyName: 'companyName_e245bf59',
    description: 'description_e245bf59',
    addFileButton: 'addFileButton_e245bf59',
    rightSection: 'rightSection_e245bf59',
    leadership: 'leadership_e245bf59',
    searchContainer: 'searchContainer_e245bf59',
    searchIcon: 'searchIcon_e245bf59',
    searchInput: 'searchInput_e245bf59'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);


/***/ }),

/***/ 6732:
/*!************************************************************************!*\
  !*** ./lib/webparts/migration/components/MetadataForm/MetadataForm.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MetadataForm: () => (/* binding */ MetadataForm),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MetadataForm.module.scss */ 1527);
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


var MetadataForm = function (_a) {
    var onSubmit = _a.onSubmit, onClose = _a.onClose;
    var _b = react__WEBPACK_IMPORTED_MODULE_0__.useState({
        title: '',
        abstract: '',
        bu: '',
        department: '',
        region: '',
        client: '',
        documentType: '',
        diseaseArea: '',
        therapyArea: '',
        emails: '',
        phones: '',
        ids: '',
        pricing: '',
        sensitive: ''
    }), values = _b[0], setValues = _b[1];
    var onChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setValues(function (v) {
            var _a;
            return (__assign(__assign({}, v), (_a = {}, _a[name] = value, _a)));
        });
    };
    var handleSubmit = function (e) {
        e && e.preventDefault();
        onSubmit && onSubmit(values);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].formWrapper },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].headerBar },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].titleWrap },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].title }, "Document Metadata"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].subtitle }, "Add context and tags for better discoverability"))),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { type: "button", "aria-label": "Close", className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].closeBtn, onClick: function () { return onClose && onClose(); }, title: "Close" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": true },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: "M18 6L6 18M6 6l12 12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }))),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cardMeta },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", { onSubmit: handleSubmit },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].formInner },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].grid },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].field },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].label, htmlFor: "title" }, "Title"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { id: "title", name: "title", placeholder: "Enter document title", value: values.title, onChange: onChange, className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].input })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].field },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].label, htmlFor: "documentType" }, "Document Type"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { id: "documentType", name: "documentType", placeholder: "e.g., PPTX, Report", value: values.documentType, onChange: onChange, className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].input })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].field },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].label, htmlFor: "bu" }, "Business Unit"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { id: "bu", name: "bu", placeholder: "Select or type BU", value: values.bu, onChange: onChange, className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].input })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].field },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].label, htmlFor: "department" }, "Department"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { id: "department", name: "department", placeholder: "Department", value: values.department, onChange: onChange, className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].input })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].field },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].label, htmlFor: "region" }, "Region"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { id: "region", name: "region", placeholder: "Region", value: values.region, onChange: onChange, className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].input })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].field },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].label, htmlFor: "client" }, "Client"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { id: "client", name: "client", placeholder: "Client name", value: values.client, onChange: onChange, className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].input })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].fieldFull },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].label, htmlFor: "abstract" }, "Abstract"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("textarea", { id: "abstract", name: "abstract", placeholder: "Short summary (1-2 lines)", value: values.abstract, onChange: onChange, className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].textarea })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].fieldFull },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].label, htmlFor: "emails" }, "Emails Found"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("textarea", { id: "emails", name: "emails", value: values.emails, onChange: onChange, className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].textarea })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].fieldFull },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].label, htmlFor: "phones" }, "Phones Found"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("textarea", { id: "phones", name: "phones", value: values.phones, onChange: onChange, className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].textarea })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].fieldFull },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].label, htmlFor: "ids" }, "IDs Found"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("textarea", { id: "ids", name: "ids", value: values.ids, onChange: onChange, className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].textarea })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].fieldFull },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].label, htmlFor: "pricing" }, "Pricing / Sensitive Terms"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("textarea", { id: "pricing", name: "pricing", value: values.pricing, onChange: onChange, className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].textarea }))),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { marginTop: 12, display: 'flex', justifyContent: 'flex-end' } },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { type: "submit", className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].submitBtn }, "Submit")))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MetadataForm);


/***/ }),

/***/ 1527:
/*!************************************************************************************!*\
  !*** ./lib/webparts/migration/components/MetadataForm/MetadataForm.module.scss.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
__webpack_require__(/*! ./MetadataForm.module.css */ 8856);
var styles = {
    formWrapper: 'formWrapper_6d4eb6a4',
    formInner: 'formInner_6d4eb6a4',
    note: 'note_6d4eb6a4',
    headerBar: 'headerBar_6d4eb6a4',
    cardMeta: 'cardMeta_6d4eb6a4',
    field: 'field_6d4eb6a4',
    title: 'title_6d4eb6a4',
    titleWrap: 'titleWrap_6d4eb6a4',
    subtitle: 'subtitle_6d4eb6a4',
    closeBtn: 'closeBtn_6d4eb6a4',
    fieldFull: 'fieldFull_6d4eb6a4',
    label: 'label_6d4eb6a4',
    input: 'input_6d4eb6a4',
    textarea: 'textarea_6d4eb6a4',
    grid: 'grid_6d4eb6a4',
    actions: 'actions_6d4eb6a4',
    submitBtn: 'submitBtn_6d4eb6a4'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);


/***/ }),

/***/ 5579:
/*!********************************************************!*\
  !*** ./lib/webparts/migration/components/Migration.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Header_Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Header/Header */ 2300);
/* harmony import */ var _Navigation_Navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Navigation/Navigation */ 3154);
/* harmony import */ var _QuestionSection_QuestionSection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./QuestionSection/QuestionSection */ 5332);
/* harmony import */ var _Footer_Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Footer/Footer */ 2508);
/* harmony import */ var _ContentArea_ContentArea__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ContentArea/ContentArea */ 1384);
/* harmony import */ var _BUDetailPage_BUDetailPage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./BUDetailPage/BUDetailPage */ 7100);
/* harmony import */ var _Migration_module_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Migration.module.scss */ 4199);
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








var Migration = /** @class */ (function (_super) {
    __extends(Migration, _super);
    function Migration(props) {
        var _this = _super.call(this, props) || this;
        _this.handleNavClick = function (page) {
            _this.setState({ activePage: page });
        };
        _this.handleBUClick = function (buName) {
            _this.setState({ selectedBU: buName, activePage: 'about' });
        };
        _this.handleBackToMain = function () {
            _this.setState({ selectedBU: null, activePage: 'about' });
        };
        _this.state = {
            activePage: 'about',
            selectedBU: null
        };
        return _this;
    }
    Migration.prototype.componentDidMount = function () {
        // Add Inter font if not already added
        if (!document.querySelector('link[href*="fonts.googleapis.com/css2?family=Inter"]')) {
            var link = document.createElement('link');
            link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }
    };
    Migration.prototype.render = function () {
        // If a BU is selected, show BU detail page
        if (this.state.selectedBU) {
            return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _Migration_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].migration },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_BUDetailPage_BUDetailPage__WEBPACK_IMPORTED_MODULE_6__.BUDetailPage, { buName: this.state.selectedBU, context: this.props.context, onBack: this.handleBackToMain })));
        }
        // Otherwise show main page
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _Migration_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].migration },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Header_Header__WEBPACK_IMPORTED_MODULE_1__.Header, null),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Navigation_Navigation__WEBPACK_IMPORTED_MODULE_2__.Navigation, { activePage: this.state.activePage, onNavClick: this.handleNavClick }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ContentArea_ContentArea__WEBPACK_IMPORTED_MODULE_5__.ContentArea, { activePage: this.state.activePage, context: this.props.context, onBUClick: this.handleBUClick }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_QuestionSection_QuestionSection__WEBPACK_IMPORTED_MODULE_3__.QuestionSection, null),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Footer_Footer__WEBPACK_IMPORTED_MODULE_4__.Footer, null)));
    };
    return Migration;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Migration);


/***/ }),

/***/ 4199:
/*!********************************************************************!*\
  !*** ./lib/webparts/migration/components/Migration.module.scss.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
__webpack_require__(/*! ./Migration.module.css */ 4843);
var styles = {
    migration: 'migration_c01701c8'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);


/***/ }),

/***/ 3154:
/*!********************************************************************!*\
  !*** ./lib/webparts/migration/components/Navigation/Navigation.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Navigation: () => (/* binding */ Navigation)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Navigation_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Navigation.module.scss */ 9038);


var Navigation = function (props) {
    var navItems = [
        { label: 'About', id: 'about' },
        { label: 'BUs', id: 'bus' },
        { label: 'Client Testimonials', id: 'testimonials' },
        { label: "Who's Who", id: 'whoswho' },
        { label: 'Community', id: 'community' },
        { label: 'Quick Links', id: 'quicklinks' }
    ];
    var handleClick = function (e, pageId) {
        e.preventDefault();
        props.onNavClick(pageId);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("nav", { className: _Navigation_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].navigation },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _Navigation_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].navContainer }, navItems.map(function (item) { return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { key: item.id, href: "#", onClick: function (e) { return handleClick(e, item.id); }, className: "".concat(_Navigation_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].navItem, " ").concat(props.activePage === item.id ? _Navigation_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].active : '') }, item.label)); }))));
};


/***/ }),

/***/ 9038:
/*!********************************************************************************!*\
  !*** ./lib/webparts/migration/components/Navigation/Navigation.module.scss.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
__webpack_require__(/*! ./Navigation.module.css */ 4538);
var styles = {
    navigation: 'navigation_e0b26b5e',
    navContainer: 'navContainer_e0b26b5e',
    navItem: 'navItem_e0b26b5e',
    active: 'active_e0b26b5e'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);


/***/ }),

/***/ 5332:
/*!******************************************************************************!*\
  !*** ./lib/webparts/migration/components/QuestionSection/QuestionSection.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuestionSection: () => (/* binding */ QuestionSection)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _QuestionSection_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QuestionSection.module.scss */ 3356);


var QuestionSection = function (props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _QuestionSection_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].questionSection },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _QuestionSection_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].questionContainer },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _QuestionSection_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].leftPrompt },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: _QuestionSection_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].promptText }, "Ask your question here")),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _QuestionSection_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].rightInput },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { type: "text", className: _QuestionSection_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].questionInput, placeholder: "Type your question..." })))));
};


/***/ }),

/***/ 3356:
/*!******************************************************************************************!*\
  !*** ./lib/webparts/migration/components/QuestionSection/QuestionSection.module.scss.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
__webpack_require__(/*! ./QuestionSection.module.css */ 2408);
var styles = {
    questionSection: 'questionSection_fc045cad',
    questionContainer: 'questionContainer_fc045cad',
    leftPrompt: 'leftPrompt_fc045cad',
    promptText: 'promptText_fc045cad',
    rightInput: 'rightInput_fc045cad',
    questionInput: 'questionInput_fc045cad'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);


/***/ }),

/***/ 3710:
/*!*************************************************************!*\
  !*** ./lib/webparts/migration/pages/AboutPage/AboutPage.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AboutPage: () => (/* binding */ AboutPage)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AboutPage_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AboutPage.module.scss */ 5978);


var AboutPage = function (props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _AboutPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].aboutPage },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _AboutPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].contentContainer },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: _AboutPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].contentText }, "A detailed writeup on BU, their service offerings, the clients etc."),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _AboutPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].carouselIndicators },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "".concat(_AboutPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dot, " ").concat(_AboutPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].active) }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: _AboutPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dot }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: _AboutPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dot })))));
};


/***/ }),

/***/ 5978:
/*!*************************************************************************!*\
  !*** ./lib/webparts/migration/pages/AboutPage/AboutPage.module.scss.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
__webpack_require__(/*! ./AboutPage.module.css */ 6122);
var styles = {
    aboutPage: 'aboutPage_afa5522c',
    contentContainer: 'contentContainer_afa5522c',
    contentText: 'contentText_afa5522c',
    carouselIndicators: 'carouselIndicators_afa5522c',
    dot: 'dot_afa5522c',
    active: 'active_afa5522c'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);


/***/ }),

/***/ 9622:
/*!*********************************************************!*\
  !*** ./lib/webparts/migration/pages/BUsPage/BUsPage.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BUsPage: () => (/* binding */ BUsPage)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BUsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BUsPage.module.scss */ 6066);


var BUsPage = function (props) {
    var buButtons = ['ECS', 'EM', 'Clinical', 'OA', 'Global Ops'];
    var handleBUClick = function (buName) {
        if (props.onBUClick) {
            props.onBUClick(buName);
        }
    };
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _BUsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].busPage },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _BUsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].contentContainer },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _BUsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].buttonsGrid }, buButtons.map(function (bu, index) { return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { key: index, className: _BUsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].buButton, onClick: function () { return handleBUClick(bu); } }, bu)); })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _BUsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].carouselIndicators },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "".concat(_BUsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dot, " ").concat(_BUsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].active) }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: _BUsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dot }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: _BUsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dot })))));
};


/***/ }),

/***/ 6066:
/*!*********************************************************************!*\
  !*** ./lib/webparts/migration/pages/BUsPage/BUsPage.module.scss.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
__webpack_require__(/*! ./BUsPage.module.css */ 6130);
var styles = {
    busPage: 'busPage_fcea57b1',
    contentContainer: 'contentContainer_fcea57b1',
    buttonsGrid: 'buttonsGrid_fcea57b1',
    buButton: 'buButton_fcea57b1',
    carouselIndicators: 'carouselIndicators_fcea57b1',
    dot: 'dot_fcea57b1',
    active: 'active_fcea57b1'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);


/***/ }),

/***/ 8464:
/*!***************************************************************************************!*\
  !*** ./lib/webparts/migration/pages/ClientTestimonialsPage/ClientTestimonialsPage.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClientTestimonialsPage: () => (/* binding */ ClientTestimonialsPage)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ClientTestimonialsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ClientTestimonialsPage.module.scss */ 6024);


var ClientTestimonialsPage = function (props) {
    var testimonials = [1, 2, 3, 4, 5];
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _ClientTestimonialsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].testimonialsPage },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _ClientTestimonialsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].contentContainer },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _ClientTestimonialsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].testimonialsGrid }, testimonials.map(function (index) { return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { key: index, className: _ClientTestimonialsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].testimonialCard },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: _ClientTestimonialsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].testimonialText }, "Client Feedback or testimonials."))); })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _ClientTestimonialsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].carouselIndicators },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: _ClientTestimonialsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dot }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "".concat(_ClientTestimonialsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dot, " ").concat(_ClientTestimonialsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].active) }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: _ClientTestimonialsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dot })))));
};


/***/ }),

/***/ 6024:
/*!***************************************************************************************************!*\
  !*** ./lib/webparts/migration/pages/ClientTestimonialsPage/ClientTestimonialsPage.module.scss.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
__webpack_require__(/*! ./ClientTestimonialsPage.module.css */ 2936);
var styles = {
    testimonialsPage: 'testimonialsPage_6a9a225d',
    contentContainer: 'contentContainer_6a9a225d',
    testimonialsGrid: 'testimonialsGrid_6a9a225d',
    testimonialCard: 'testimonialCard_6a9a225d',
    testimonialText: 'testimonialText_6a9a225d',
    carouselIndicators: 'carouselIndicators_6a9a225d',
    dot: 'dot_6a9a225d',
    active: 'active_6a9a225d'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);


/***/ }),

/***/ 9482:
/*!*********************************************************************!*\
  !*** ./lib/webparts/migration/pages/CommunityPage/CommunityPage.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CommunityPage: () => (/* binding */ CommunityPage)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CommunityPage_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CommunityPage.module.scss */ 6390);


var CommunityPage = function (props) {
    var communities = ['Community 1', 'Community 2', 'Community 3'];
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _CommunityPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].communityPage },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _CommunityPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].contentContainer },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _CommunityPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].communitiesGrid }, communities.map(function (community, index) { return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { key: index, className: _CommunityPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].communityCard },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: _CommunityPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].communityText }, community))); })))));
};


/***/ }),

/***/ 6390:
/*!*********************************************************************************!*\
  !*** ./lib/webparts/migration/pages/CommunityPage/CommunityPage.module.scss.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
__webpack_require__(/*! ./CommunityPage.module.css */ 254);
var styles = {
    communityPage: 'communityPage_01d0c138',
    contentContainer: 'contentContainer_01d0c138',
    communitiesGrid: 'communitiesGrid_01d0c138',
    communityCard: 'communityCard_01d0c138',
    communityText: 'communityText_01d0c138'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);


/***/ }),

/***/ 3282:
/*!***********************************************************************!*\
  !*** ./lib/webparts/migration/pages/QuickLinksPage/QuickLinksPage.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuickLinksPage: () => (/* binding */ QuickLinksPage)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _QuickLinksPage_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QuickLinksPage.module.scss */ 2590);


var QuickLinksPage = function (props) {
    var quickLinks = [
        'Case Studies',
        'Capabilities',
        'Proposals',
        'RFIs',
        'Battlecards',
        'Sessions',
        'Blogs',
        'Reports',
        'Newsletters',
        'Other Knowledge Artifacts'
    ];
    var handleLinkClick = function (link, e) {
        e.preventDefault();
        // Redirection will be configured later
        console.log("Clicked: ".concat(link));
    };
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _QuickLinksPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].quickLinksPage },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _QuickLinksPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].pageContainer },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _QuickLinksPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].quickLinksSidebar },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", { className: _QuickLinksPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].sidebarTitle }, "Quick Links"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("ul", { className: _QuickLinksPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].linksList }, quickLinks.map(function (link, index) { return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", { key: index },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { href: "#", onClick: function (e) { return handleLinkClick(link, e); }, className: _QuickLinksPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].linkItem },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: _QuickLinksPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].linkArrow }, ">"),
                        link))); }))))));
};


/***/ }),

/***/ 2590:
/*!***********************************************************************************!*\
  !*** ./lib/webparts/migration/pages/QuickLinksPage/QuickLinksPage.module.scss.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
__webpack_require__(/*! ./QuickLinksPage.module.css */ 9462);
var styles = {
    quickLinksPage: 'quickLinksPage_19320504',
    pageContainer: 'pageContainer_19320504',
    quickLinksSidebar: 'quickLinksSidebar_19320504',
    sidebarTitle: 'sidebarTitle_19320504',
    linksList: 'linksList_19320504',
    linkItem: 'linkItem_19320504',
    linkArrow: 'linkArrow_19320504'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);


/***/ }),

/***/ 6602:
/*!***************************************************************************!*\
  !*** ./lib/webparts/migration/pages/ServiceLinesPage/ServiceLinesPage.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ServiceLinesPage: () => (/* binding */ ServiceLinesPage)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ServiceLinesPage_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ServiceLinesPage.module.scss */ 8438);


var ServiceLinesPage = function (props) {
    var serviceLines = ['SL 1', 'SL 2', 'SL 3', 'SL 4', 'SL 5', 'SL 6', 'SL 7'];
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _ServiceLinesPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].serviceLinesPage },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _ServiceLinesPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].contentContainer },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _ServiceLinesPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].buttonsGrid }, serviceLines.map(function (sl, index) { return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { key: index, className: _ServiceLinesPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].slButton }, sl)); })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _ServiceLinesPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].carouselIndicators },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "".concat(_ServiceLinesPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dot, " ").concat(_ServiceLinesPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].active) }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: _ServiceLinesPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dot }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: _ServiceLinesPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dot })))));
};


/***/ }),

/***/ 8438:
/*!***************************************************************************************!*\
  !*** ./lib/webparts/migration/pages/ServiceLinesPage/ServiceLinesPage.module.scss.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
__webpack_require__(/*! ./ServiceLinesPage.module.css */ 2110);
var styles = {
    serviceLinesPage: 'serviceLinesPage_12ef78dc',
    contentContainer: 'contentContainer_12ef78dc',
    buttonsGrid: 'buttonsGrid_12ef78dc',
    slButton: 'slButton_12ef78dc',
    carouselIndicators: 'carouselIndicators_12ef78dc',
    dot: 'dot_12ef78dc',
    active: 'active_12ef78dc'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);


/***/ }),

/***/ 5338:
/*!*****************************************************************!*\
  !*** ./lib/webparts/migration/pages/WhosWhoPage/WhosWhoPage.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WhosWhoPage: () => (/* binding */ WhosWhoPage)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _WhosWhoPage_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WhosWhoPage.module.scss */ 5782);


var WhosWhoPage = function (props) {
    var _a = react__WEBPACK_IMPORTED_MODULE_0__.useState('BU 1'), activeBU = _a[0], setActiveBU = _a[1];
    var buButtons = ['ECS', 'EM', 'Clinical', 'OA', 'Global Ops'];
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _WhosWhoPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].whosWhoPage },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _WhosWhoPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].contentContainer },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _WhosWhoPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].buFilters }, buButtons.map(function (bu) { return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { key: bu, onClick: function () { return setActiveBU(bu); }, className: "".concat(_WhosWhoPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].buFilterButton, " ").concat(activeBU === bu ? _WhosWhoPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].active : '') }, bu)); })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _WhosWhoPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].mainContentBlock },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: _WhosWhoPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].contentText }, "BU Head | SL 1 | SL 2 | SL 3 | SL 4 | SL 5")),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _WhosWhoPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].carouselIndicators },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: _WhosWhoPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dot }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: "".concat(_WhosWhoPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dot, " ").concat(_WhosWhoPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].active) }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: _WhosWhoPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dot })))));
};


/***/ }),

/***/ 5782:
/*!*****************************************************************************!*\
  !*** ./lib/webparts/migration/pages/WhosWhoPage/WhosWhoPage.module.scss.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
__webpack_require__(/*! ./WhosWhoPage.module.css */ 2278);
var styles = {
    whosWhoPage: 'whosWhoPage_e154758d',
    contentContainer: 'contentContainer_e154758d',
    buFilters: 'buFilters_e154758d',
    buFilterButton: 'buFilterButton_e154758d',
    active: 'active_e154758d',
    mainContentBlock: 'mainContentBlock_e154758d',
    contentText: 'contentText_e154758d',
    carouselIndicators: 'carouselIndicators_e154758d',
    dot: 'dot_e154758d'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);


/***/ }),

/***/ 6323:
/*!***********************************************************************************************************!*\
  !*** ./node_modules/@microsoft/sp-css-loader/node_modules/@microsoft/load-themed-styles/lib-es6/index.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClearStyleOptions: () => (/* binding */ ClearStyleOptions),
/* harmony export */   Mode: () => (/* binding */ Mode),
/* harmony export */   clearStyles: () => (/* binding */ clearStyles),
/* harmony export */   configureLoadStyles: () => (/* binding */ configureLoadStyles),
/* harmony export */   configureRunMode: () => (/* binding */ configureRunMode),
/* harmony export */   detokenize: () => (/* binding */ detokenize),
/* harmony export */   flush: () => (/* binding */ flush),
/* harmony export */   loadStyles: () => (/* binding */ loadStyles),
/* harmony export */   loadTheme: () => (/* binding */ loadTheme),
/* harmony export */   splitStyles: () => (/* binding */ splitStyles)
/* harmony export */ });
// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * In sync mode, styles are registered as style elements synchronously with loadStyles() call.
 * In async mode, styles are buffered and registered as batch in async timer for performance purpose.
 */
var Mode;
(function (Mode) {
    Mode[Mode["sync"] = 0] = "sync";
    Mode[Mode["async"] = 1] = "async";
})(Mode || (Mode = {}));
/**
 * Themable styles and non-themable styles are tracked separately
 * Specify ClearStyleOptions when calling clearStyles API to specify which group of registered styles should be cleared.
 */
var ClearStyleOptions;
(function (ClearStyleOptions) {
    /** only themable styles will be cleared */
    ClearStyleOptions[ClearStyleOptions["onlyThemable"] = 1] = "onlyThemable";
    /** only non-themable styles will be cleared */
    ClearStyleOptions[ClearStyleOptions["onlyNonThemable"] = 2] = "onlyNonThemable";
    /** both themable and non-themable styles will be cleared */
    ClearStyleOptions[ClearStyleOptions["all"] = 3] = "all";
})(ClearStyleOptions || (ClearStyleOptions = {}));
// Store the theming state in __themeState__ global scope for reuse in the case of duplicate
// load-themed-styles hosted on the page.
var _root = typeof window === 'undefined' ? __webpack_require__.g : window; // eslint-disable-line @typescript-eslint/no-explicit-any
// Nonce string to inject into script tag if one provided. This is used in CSP (Content Security Policy).
var _styleNonce = _root && _root.CSPSettings && _root.CSPSettings.nonce;
var _themeState = initializeThemeState();
/**
 * Matches theming tokens. For example, "[theme: themeSlotName, default: #FFF]" (including the quotes).
 */
var _themeTokenRegex = /[\'\"]\[theme:\s*(\w+)\s*(?:\,\s*default:\s*([\\"\']?[\.\,\(\)\#\-\s\w]*[\.\,\(\)\#\-\w][\"\']?))?\s*\][\'\"]/g;
var now = function () {
    return typeof performance !== 'undefined' && !!performance.now ? performance.now() : Date.now();
};
function measure(func) {
    var start = now();
    func();
    var end = now();
    _themeState.perf.duration += end - start;
}
/**
 * initialize global state object
 */
function initializeThemeState() {
    var state = _root.__themeState__ || {
        theme: undefined,
        lastStyleElement: undefined,
        registeredStyles: []
    };
    if (!state.runState) {
        state = __assign(__assign({}, state), { perf: {
                count: 0,
                duration: 0
            }, runState: {
                flushTimer: 0,
                mode: Mode.sync,
                buffer: []
            } });
    }
    if (!state.registeredThemableStyles) {
        state = __assign(__assign({}, state), { registeredThemableStyles: [] });
    }
    _root.__themeState__ = state;
    return state;
}
/**
 * Loads a set of style text. If it is registered too early, we will register it when the window.load
 * event is fired.
 * @param {string | ThemableArray} styles Themable style text to register.
 * @param {boolean} loadAsync When true, always load styles in async mode, irrespective of current sync mode.
 */
function loadStyles(styles, loadAsync) {
    if (loadAsync === void 0) { loadAsync = false; }
    measure(function () {
        var styleParts = Array.isArray(styles) ? styles : splitStyles(styles);
        var _a = _themeState.runState, mode = _a.mode, buffer = _a.buffer, flushTimer = _a.flushTimer;
        if (loadAsync || mode === Mode.async) {
            buffer.push(styleParts);
            if (!flushTimer) {
                _themeState.runState.flushTimer = asyncLoadStyles();
            }
        }
        else {
            applyThemableStyles(styleParts);
        }
    });
}
/**
 * Allows for customizable loadStyles logic. e.g. for server side rendering application
 * @param {(processedStyles: string, rawStyles?: string | ThemableArray) => void}
 * a loadStyles callback that gets called when styles are loaded or reloaded
 */
function configureLoadStyles(loadStylesFn) {
    _themeState.loadStyles = loadStylesFn;
}
/**
 * Configure run mode of load-themable-styles
 * @param mode load-themable-styles run mode, async or sync
 */
function configureRunMode(mode) {
    _themeState.runState.mode = mode;
}
/**
 * external code can call flush to synchronously force processing of currently buffered styles
 */
function flush() {
    measure(function () {
        var styleArrays = _themeState.runState.buffer.slice();
        _themeState.runState.buffer = [];
        var mergedStyleArray = [].concat.apply([], styleArrays);
        if (mergedStyleArray.length > 0) {
            applyThemableStyles(mergedStyleArray);
        }
    });
}
/**
 * register async loadStyles
 */
function asyncLoadStyles() {
    // Use "self" to distinguish conflicting global typings for setTimeout() from lib.dom.d.ts vs Jest's @types/node
    // https://github.com/jestjs/jest/issues/14418
    return self.setTimeout(function () {
        _themeState.runState.flushTimer = 0;
        flush();
    }, 0);
}
/**
 * Loads a set of style text. If it is registered too early, we will register it when the window.load event
 * is fired.
 * @param {string} styleText Style to register.
 * @param {IStyleRecord} styleRecord Existing style record to re-apply.
 */
function applyThemableStyles(stylesArray, styleRecord) {
    if (_themeState.loadStyles) {
        _themeState.loadStyles(resolveThemableArray(stylesArray).styleString, stylesArray);
    }
    else {
        registerStyles(stylesArray);
    }
}
/**
 * Registers a set theme tokens to find and replace. If styles were already registered, they will be
 * replaced.
 * @param {theme} theme JSON object of theme tokens to values.
 */
function loadTheme(theme) {
    _themeState.theme = theme;
    // reload styles.
    reloadStyles();
}
/**
 * Clear already registered style elements and style records in theme_State object
 * @param option - specify which group of registered styles should be cleared.
 * Default to be both themable and non-themable styles will be cleared
 */
function clearStyles(option) {
    if (option === void 0) { option = ClearStyleOptions.all; }
    if (option === ClearStyleOptions.all || option === ClearStyleOptions.onlyNonThemable) {
        clearStylesInternal(_themeState.registeredStyles);
        _themeState.registeredStyles = [];
    }
    if (option === ClearStyleOptions.all || option === ClearStyleOptions.onlyThemable) {
        clearStylesInternal(_themeState.registeredThemableStyles);
        _themeState.registeredThemableStyles = [];
    }
}
function clearStylesInternal(records) {
    records.forEach(function (styleRecord) {
        var styleElement = styleRecord && styleRecord.styleElement;
        if (styleElement && styleElement.parentElement) {
            styleElement.parentElement.removeChild(styleElement);
        }
    });
}
/**
 * Reloads styles.
 */
function reloadStyles() {
    if (_themeState.theme) {
        var themableStyles = [];
        for (var _i = 0, _a = _themeState.registeredThemableStyles; _i < _a.length; _i++) {
            var styleRecord = _a[_i];
            themableStyles.push(styleRecord.themableStyle);
        }
        if (themableStyles.length > 0) {
            clearStyles(ClearStyleOptions.onlyThemable);
            applyThemableStyles([].concat.apply([], themableStyles));
        }
    }
}
/**
 * Find theme tokens and replaces them with provided theme values.
 * @param {string} styles Tokenized styles to fix.
 */
function detokenize(styles) {
    if (styles) {
        styles = resolveThemableArray(splitStyles(styles)).styleString;
    }
    return styles;
}
/**
 * Resolves ThemingInstruction objects in an array and joins the result into a string.
 * @param {ThemableArray} splitStyleArray ThemableArray to resolve and join.
 */
function resolveThemableArray(splitStyleArray) {
    var theme = _themeState.theme;
    var themable = false;
    // Resolve the array of theming instructions to an array of strings.
    // Then join the array to produce the final CSS string.
    var resolvedArray = (splitStyleArray || []).map(function (currentValue) {
        var themeSlot = currentValue.theme;
        if (themeSlot) {
            themable = true;
            // A theming annotation. Resolve it.
            var themedValue = theme ? theme[themeSlot] : undefined;
            var defaultValue = currentValue.defaultValue || 'inherit';
            // Warn to console if we hit an unthemed value even when themes are provided, but only if "DEBUG" is true.
            // Allow the themedValue to be undefined to explicitly request the default value.
            if (theme &&
                !themedValue &&
                console &&
                !(themeSlot in theme) &&
                "boolean" !== 'undefined' &&
                true) {
                // eslint-disable-next-line no-console
                console.warn("Theming value not provided for \"".concat(themeSlot, "\". Falling back to \"").concat(defaultValue, "\"."));
            }
            return themedValue || defaultValue;
        }
        else {
            // A non-themable string. Preserve it.
            return currentValue.rawString;
        }
    });
    return {
        styleString: resolvedArray.join(''),
        themable: themable
    };
}
/**
 * Split tokenized CSS into an array of strings and theme specification objects
 * @param {string} styles Tokenized styles to split.
 */
function splitStyles(styles) {
    var result = [];
    if (styles) {
        var pos = 0; // Current position in styles.
        var tokenMatch = void 0;
        while ((tokenMatch = _themeTokenRegex.exec(styles))) {
            var matchIndex = tokenMatch.index;
            if (matchIndex > pos) {
                result.push({
                    rawString: styles.substring(pos, matchIndex)
                });
            }
            result.push({
                theme: tokenMatch[1],
                defaultValue: tokenMatch[2] // May be undefined
            });
            // index of the first character after the current match
            pos = _themeTokenRegex.lastIndex;
        }
        // Push the rest of the string after the last match.
        result.push({
            rawString: styles.substring(pos)
        });
    }
    return result;
}
/**
 * Registers a set of style text. If it is registered too early, we will register it when the
 * window.load event is fired.
 * @param {ThemableArray} styleArray Array of IThemingInstruction objects to register.
 * @param {IStyleRecord} styleRecord May specify a style Element to update.
 */
function registerStyles(styleArray) {
    if (typeof document === 'undefined') {
        return;
    }
    var head = document.getElementsByTagName('head')[0];
    var styleElement = document.createElement('style');
    var _a = resolveThemableArray(styleArray), styleString = _a.styleString, themable = _a.themable;
    styleElement.setAttribute('data-load-themed-styles', 'true');
    if (_styleNonce) {
        styleElement.setAttribute('nonce', _styleNonce);
    }
    styleElement.appendChild(document.createTextNode(styleString));
    _themeState.perf.count++;
    head.appendChild(styleElement);
    var ev = document.createEvent('HTMLEvents');
    ev.initEvent('styleinsert', true /* bubbleEvent */, false /* cancelable */);
    ev.args = {
        newStyle: styleElement
    };
    document.dispatchEvent(ev);
    var record = {
        styleElement: styleElement,
        themableStyle: styleArray
    };
    if (themable) {
        _themeState.registeredThemableStyles.push(record);
    }
    else {
        _themeState.registeredStyles.push(record);
    }
}


/***/ }),

/***/ 9676:
/*!*********************************************!*\
  !*** external "@microsoft/sp-core-library" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__9676__;

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

/***/ 9943:
/*!******************************************!*\
  !*** external "MigrationWebPartStrings" ***!
  \******************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__9943__;

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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/*!****************************************************!*\
  !*** ./lib/webparts/migration/MigrationWebPart.js ***!
  \****************************************************/
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
/* harmony import */ var MigrationWebPartStrings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! MigrationWebPartStrings */ 9943);
/* harmony import */ var MigrationWebPartStrings__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(MigrationWebPartStrings__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_Migration__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/Migration */ 5579);
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







var MigrationWebPart = /** @class */ (function (_super) {
    __extends(MigrationWebPart, _super);
    function MigrationWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MigrationWebPart.prototype.render = function () {
        var element = react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_Migration__WEBPACK_IMPORTED_MODULE_6__["default"], {
            description: this.properties.description,
            context: this.context
        });
        react_dom__WEBPACK_IMPORTED_MODULE_1__.render(element, this.domElement);
    };
    MigrationWebPart.prototype.onDispose = function () {
        react_dom__WEBPACK_IMPORTED_MODULE_1__.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(MigrationWebPart.prototype, "dataVersion", {
        get: function () {
            return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__.Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    MigrationWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: MigrationWebPartStrings__WEBPACK_IMPORTED_MODULE_5__.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: MigrationWebPartStrings__WEBPACK_IMPORTED_MODULE_5__.BasicGroupName,
                            groupFields: [
                                (0,_microsoft_sp_property_pane__WEBPACK_IMPORTED_MODULE_3__.PropertyPaneTextField)('description', {
                                    label: MigrationWebPartStrings__WEBPACK_IMPORTED_MODULE_5__.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return MigrationWebPart;
}(_microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_4__.BaseClientSideWebPart));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MigrationWebPart);

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});;
//# sourceMappingURL=migration-web-part.js.map