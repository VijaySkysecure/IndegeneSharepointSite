define("a1b2c3d4-e5f6-7890-abcd-ef1234567892_1.0.0", ["@microsoft/sp-property-pane","@microsoft/sp-core-library","MigrationWebPartStrings","@microsoft/sp-webpart-base","react","react-dom","@microsoft/sp-http"], function(__WEBPACK_EXTERNAL_MODULE__26ea__, __WEBPACK_EXTERNAL_MODULE_UWqr__, __WEBPACK_EXTERNAL_MODULE_bgOf__, __WEBPACK_EXTERNAL_MODULE_br4S__, __WEBPACK_EXTERNAL_MODULE_cDcd__, __WEBPACK_EXTERNAL_MODULE_faye__, __WEBPACK_EXTERNAL_MODULE_vlQI__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"migration-web-part": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "chunk." + ({}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/ 				if (script.src.indexOf(window.location.origin + '/') !== 0) {
/******/ 					script.crossOrigin = "anonymous";
/******/ 				}
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonpa1b2c3d4_e5f6_7890_abcd_ef1234567892_1_0_0"] = window["webpackJsonpa1b2c3d4_e5f6_7890_abcd_ef1234567892_1_0_0"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Set the webpack public path
/******/ 	(function () {
/******/ 	  var scripts = document.getElementsByTagName('script');
/******/ 	  var regex = /migration-web-part\.js/i;
/******/ 	  var publicPath;
/******/
/******/ 	  if (scripts && scripts.length) {
/******/ 	    for (var i = 0; i < scripts.length; i++) {
/******/ 	      if (!scripts[i]) continue;
/******/ 	      var path = scripts[i].getAttribute('src');
/******/ 	      if (path && path.match(regex)) {
/******/ 	        publicPath = path.substring(0, path.lastIndexOf('/') + 1);
/******/ 	        break;
/******/ 	      }
/******/ 	    }
/******/ 	  }
/******/
/******/ 	  if (!publicPath) {
/******/ 	    for (var global in window.__setWebpackPublicPathLoaderSrcRegistry__) {
/******/ 	      if (global && global.match(regex)) {
/******/ 	        publicPath = global.substring(0, global.lastIndexOf('/') + 1);
/******/ 	        break;
/******/ 	      }
/******/ 	    }
/******/ 	  }
/******/ 	  __webpack_require__.p = publicPath;
/******/ 	})();
/******/ 	
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "A50K");
/******/ })
/************************************************************************/
/******/ ({

/***/ "+NpX":
/*!****************************************************************!*\
  !*** ./lib/webparts/migration/services/ValidationConstants.js ***!
  \****************************************************************/
/*! exports provided: ALLOWED_BUSINESS_UNITS, ALLOWED_DEPARTMENTS, findBestMatch, ALLOWED_DISEASE_AREAS, ALLOWED_THERAPY_AREAS, ALLOWED_DOCUMENT_TYPES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALLOWED_BUSINESS_UNITS", function() { return ALLOWED_BUSINESS_UNITS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALLOWED_DEPARTMENTS", function() { return ALLOWED_DEPARTMENTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findBestMatch", function() { return findBestMatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALLOWED_DISEASE_AREAS", function() { return ALLOWED_DISEASE_AREAS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALLOWED_THERAPY_AREAS", function() { return ALLOWED_THERAPY_AREAS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALLOWED_DOCUMENT_TYPES", function() { return ALLOWED_DOCUMENT_TYPES; });
/**
 * Validation constants for Business Units and Departments
 */
var ALLOWED_BUSINESS_UNITS = [
    'Organization Functions',
    'Chief Technology Office',
    'Co-Commercialization',
    'Enterprise Commercial',
    'Growth Markets',
    'Enterprise Clinical',
    'Indegene Japan',
    'Enterprise Medical',
    'Medical Devices',
    'Multi-Channel Marketing',
    'Strategy and Development',
    'Enterprise Product Office',
    'Transformative Software Solutions',
    'Finance and Legal',
    'Global Operations',
    'People Practices & Systems',
    'Sales Lifesciences'
];
var ALLOWED_DEPARTMENTS = [
    'Leadership & Organization Development',
    'Chief Technology Office',
    'Enterprise Informatics',
    'Enterprise Product Office',
    'Enterprise Tech Office',
    'Research & Development',
    'Co-Commercialization',
    'Omnichannel Acceleration',
    'Enterprise Commercial',
    'Omnichannel Solutions',
    'Enterprise Commercial Activation and Change Management',
    'Content Transformation & Solutions',
    'Enterprise Commercial Delivery Services',
    'Customer Experience Success Office (CESO)',
    'Digital Enablement',
    'Data and Analytics',
    'Content and Design Solutions',
    'CXD Content and Experience Design',
    'Web and Portal Solutions',
    'Patient Experience',
    'Customer Advisory and Experience',
    'Digital Innovation and Transformation',
    'Campaign and Channel Operations',
    'ECS Platforms and Technology',
    'ECS Solutioning Presales and Marketing',
    'BU Sales',
    'Campaign Ops',
    'Growth Markets',
    'GM - Sales & Solutions',
    'Enterprise Clinical',
    'Clinical Data Management',
    'RWD & Biostats',
    'Clinical Operations',
    'Digital Patient Recruitment and Engagement',
    'Indegene Japan',
    'Sales - Japan',
    'Enterprise Medical',
    'Enterprise Medical Client Partnership and Advisory',
    'Medical Affairs',
    'Medical Communication',
    'Material Review, Operations and Compliance',
    'Promotional and Medical Review',
    'Learning & Development Solutions',
    'Health Care Practitioners (HCP)',
    'Learning and Development',
    'Safety',
    'Pharmacovigilance',
    'Regulatory Affairs',
    'Labelling Solutions',
    'Packaging Artwork and Labelling',
    'Health Economics & Outcomes Research',
    'PRMA Common',
    'Enterprise Medical Platforms and Technology',
    'Medical Devices',
    'Device Technology',
    'Quality and Regulatory',
    'Solutioning Sales and Marketing',
    'Medical Content Solutions',
    'Multi-Channel Marketing',
    'Medical Engagement Solutions',
    'Digital Solutions',
    'Strategy and Development',
    'Corporate Planning',
    'Corporate Strategy',
    'Corporate Development',
    'Enterprise Product Office',
    'Product - Medical',
    'Engineering - Commercial',
    'Product - Commercial',
    'Engineering - Medical',
    'Transformative Software Solutions',
    'Engineering Office',
    'Finance and Legal',
    'Business Finance',
    'Finance - Controllership',
    'Legal',
    'Taxation',
    'Global Operations',
    'Knowledge Management',
    'Risk Audit and Compliance',
    'Process Design and Automation',
    'Workforce Management',
    'Enterprise Program Management Office (EPMO)',
    'Operational Excellence',
    'People Practices & Systems',
    'HR Systems & Technology',
    'Talent Operations',
    'Talent Management and Engagement',
    'Talent Acquisition',
    'iAcademy',
    'Campus and Pool',
    'Organizational Development',
    'Sales Lifesciences',
    'Sales China',
    'Growth and Emerging Accounts',
    'Sales LifesSciences',
    'Key Accounts',
    'CultHealth',
    'Corporate Planning',
    'Global Delivery Center',
    'Emerging Biotech',
    'mySheets',
    'Activation Framework',
    'Amgen C 360',
    'All',
    'Indegene Products',
    'Management',
    'DT Consulting',
    'Commercial and Facilities',
    'Information Technology',
    'Editorial',
    'Marketing and Inside Sales'
];
/**
 * Find the best match from allowed values using fuzzy matching
 * Compatible with ES5 (no Array.find or String.includes)
 */
function findBestMatch(value, allowedValues) {
    if (!value || value.trim() === '') {
        return '';
    }
    var normalizedValue = value.trim().toLowerCase();
    // Exact match (case-insensitive)
    for (var i = 0; i < allowedValues.length; i++) {
        var allowed = allowedValues[i];
        if (allowed.toLowerCase() === normalizedValue) {
            return allowed;
        }
    }
    // Partial match (contains)
    for (var i = 0; i < allowedValues.length; i++) {
        var allowed = allowedValues[i];
        var allowedLower = allowed.toLowerCase();
        if (allowedLower.indexOf(normalizedValue) !== -1 || normalizedValue.indexOf(allowedLower) !== -1) {
            return allowed;
        }
    }
    // Fuzzy match - check if any words match
    var valueWords = normalizedValue.split(/\s+/);
    for (var i = 0; i < allowedValues.length; i++) {
        var allowed = allowedValues[i];
        var allowedWords = allowed.toLowerCase().split(/\s+/);
        for (var j = 0; j < valueWords.length; j++) {
            var word = valueWords[j];
            for (var k = 0; k < allowedWords.length; k++) {
                var allowedWord = allowedWords[k];
                if (allowedWord.indexOf(word) !== -1 || word.indexOf(allowedWord) !== -1) {
                    return allowed;
                }
            }
        }
    }
    // No match found
    return '';
}
var ALLOWED_DISEASE_AREAS = [
    'Noninfectious Uveitis',
    'Occular allergy',
    'Glucoma management',
    'Dry eye disease',
    'Diabetes',
    'Endometrial cancer',
    'Brain tumors',
    'Gastrointestinal cancer',
    'Coronavirus',
    'Esophageal Cancer',
    'Prostate Cancer',
    'Oncogenatic mutation',
    'Colorectal cancer',
    'Ovarian cancer',
    'B cell Acute lymphoblastic leukemia',
    'Mutiple Myeloma',
    'Metastatic colo-rectal Cancer',
    'Breast Cancer',
    'Gastric Cancer',
    'Hematology',
    'Solid Tumors',
    'Blood Cancers',
    'Lung Cancer'
];
var ALLOWED_THERAPY_AREAS = [
    'Endocrinology',
    'Dermatology',
    'Gastroenterology',
    'Neurology',
    'Opthalmology',
    'Solid Tumors',
    'Hemet-Onco',
    'Nephrology',
    'Respiratory',
    'Rheumatology',
    'ENT',
    'Hepatology',
    'Gyneacology',
    'CVD',
    'Oncology'
];
var ALLOWED_DOCUMENT_TYPES = [
    'Knowledge Fireside Chat',
    'Style Guide',
    'Reference',
    'Submissions',
    'Regulation',
    'Guidance',
    'Use Cases',
    'Glossary',
    'Workshop',
    'Email Template',
    'Reusable Assets',
    'News',
    'Narrative',
    'One-i Collaterals',
    'Catalo Connect',
    'Template',
    'Banner',
    'Abstract',
    'SOW',
    'Feedback',
    'Research Articles',
    'Web Designing',
    'Technology',
    'toastmasters',
    'Library Resource',
    'Knowledge Transfer',
    'Deck',
    'Success Story',
    'Prompt',
    'Contact',
    'Cheat Sheet',
    'Survey',
    'Covid Report',
    'Catalog',
    'SME Profile',
    'Handbook',
    'Governance Deck',
    'Playbook',
    'Training',
    'Updates',
    'External Link',
    'Community Page',
    'Q&A',
    'E-book',
    'About',
    'Story',
    'Publication',
    'SRL',
    'e poster',
    'Plain language summary',
    'Marketing Collateral',
    'Patient story video',
    'Win',
    'Logo',
    'Interactive Poster',
    'Static Newsletter',
    'Static Slide deck',
    'E Module',
    'Static Infographic',
    'Interactive Infographic',
    'Sample Profile',
    'Sample',
    'Toolkit',
    'Code of Conduct',
    'Proposals & Pitches',
    'Form',
    'Profile',
    'RACI Document',
    'Plan',
    'Insight',
    'Demo',
    'Battle Card',
    'Experience Master',
    'Email',
    'Leadership Connect',
    'Article',
    'Assessment',
    'Style Code',
    'Agreement',
    'Recording',
    'Overview Deck',
    'Org Chart',
    'Discussion',
    'Calendar',
    'Fact Sheet',
    'KS2',
    'Proactive',
    'Thought Leadership',
    'OKR',
    'Communication',
    'ESG',
    'iKnowledge Help',
    'Frequently Asked Questions (FAQs)',
    'Concept Note',
    'Others',
    'Product',
    'Ad Collateral',
    'Analyst Briefing Presentation',
    'Analyst Report',
    'Analyst RFIs or RFP',
    'Best Practice',
    'Blog',
    'Brand Resource',
    'Brochure',
    'Capability',
    'Case Study',
    'Certificate',
    'Checklist',
    'Council Asset',
    'Customer Presentations / Overview',
    'Customer RFI or RFP',
    'eBook',
    'eMagazine',
    'Email Campaign',
    'Event Asset',
    'Expertise Note',
    'Guidelines',
    'Image',
    'Infographic',
    'Internal Announcement',
    'Internal Report or Analysis',
    'Lessons Learned',
    'Manual',
    'Marketing Plan',
    'Newsletter',
    'Onboarding Package',
    'Physical Banner',
    'Pitch Deck',
    'Podcast',
    'Policy',
    'Press Release',
    'Process',
    'Proposal',
    'RFIs/RFP',
    'Sales Deck',
    'Social Media Post',
    'SOP',
    'Sponsored Content',
    'Standard',
    'Technical Document',
    'Templates / Reports',
    'Testimonial',
    'Third Party Report',
    'Tracker',
    'Training Document/ onboarding deck',
    'Video',
    'Webinar',
    'Webpage',
    'White Paper'
];


/***/ }),

/***/ "+vjh":
/*!***********************************************************************************!*\
  !*** ./lib/webparts/migration/pages/ServiceLinesPage/ServiceLinesPage.module.css ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!../../../../../node_modules/postcss-loader/src??postcss!./ServiceLinesPage.module.css */ "Y7Lz");
var loader = __webpack_require__(/*! ./node_modules/@microsoft/loader-load-themed-styles/node_modules/@microsoft/load-themed-styles/lib/index.js */ "ruv1");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "/80R":
/*!*****************************************************************!*\
  !*** ./lib/webparts/migration/pages/BUsPage/BUsPage.module.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!../../../../../node_modules/postcss-loader/src??postcss!./BUsPage.module.css */ "0D6o");
var loader = __webpack_require__(/*! ./node_modules/@microsoft/loader-load-themed-styles/node_modules/@microsoft/load-themed-styles/lib/index.js */ "ruv1");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "0D6o":
/*!********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??postcss!./lib/webparts/migration/pages/BUsPage/BUsPage.module.css ***!
  \********************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/runtime/api.js */ "Z+AG")(false);
// Module
exports.push([module.i, ".busPage_fcea57b1{width:100%;background-color:#e3f2fd;padding:40px 60px;box-sizing:border-box;height:330px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;font-family:Inter,sans-serif}.contentContainer_fcea57b1{max-width:1400px;margin:0 auto;width:100%}.buttonsGrid_fcea57b1{display:grid;grid-template-columns:repeat(5,1fr);gap:20px;margin-bottom:15px;max-width:1000px;margin-left:auto;margin-right:auto}.buttonsGrid_fcea57b1 :nth-child(6){grid-column:2}.buttonsGrid_fcea57b1 :nth-child(7){grid-column:3}@media (max-width:1200px){.buttonsGrid_fcea57b1{grid-template-columns:repeat(3,1fr);max-width:600px}.buttonsGrid_fcea57b1 :nth-child(6),.buttonsGrid_fcea57b1 :nth-child(7){grid-column:auto}}@media (max-width:768px){.buttonsGrid_fcea57b1{grid-template-columns:repeat(2,1fr);max-width:400px}.buttonsGrid_fcea57b1 :nth-child(6),.buttonsGrid_fcea57b1 :nth-child(7){grid-column:auto}}.buButton_fcea57b1{background-color:#1976d2;color:#fff;border:none;padding:20px 30px;font-size:18px;font-weight:500;font-family:Inter,sans-serif;border-radius:4px;cursor:pointer;transition:background-color .3s,transform .2s;min-height:60px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.buButton_fcea57b1:hover{background-color:#1565c0;transform:translateY(-2px)}.buButton_fcea57b1:active{transform:translateY(0)}.carouselIndicators_fcea57b1{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;gap:12px;margin-top:15px}.dot_fcea57b1{width:12px;height:12px;border-radius:50%;background-color:#90caf9;cursor:pointer;transition:transform .3s,background-color .3s}.dot_fcea57b1:hover{transform:scale(1.2);background-color:#64b5f6}.dot_fcea57b1.active_fcea57b1{background-color:#1976d2;width:14px;height:14px}", ""]);


/***/ }),

/***/ "0EeX":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??postcss!./lib/webparts/migration/components/Header/Header.module.css ***!
  \***********************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/runtime/api.js */ "Z+AG")(false);
// Module
exports.push([module.i, ".header_e245bf59{width:100%;background:linear-gradient(90deg,#ff6b9d 0,#c44569 30%,#6c5ce7 70%,#4834d4);padding:40px 60px;color:#fff;box-sizing:border-box;font-family:Inter,sans-serif}.headerContent_e245bf59{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:start;align-items:flex-start;max-width:1400px;margin:0 auto}.leftSection_e245bf59{-ms-flex:1;flex:1}.companyName_e245bf59{font-size:48px;font-weight:700;margin:0 0 10px 0;color:#fff;font-family:Inter,sans-serif}.description_e245bf59{margin:0 0 20px 0;opacity:.95;font-weight:400}.addFileButton_e245bf59,.description_e245bf59{font-size:16px;color:#fff;font-family:Inter,sans-serif}.addFileButton_e245bf59{background-color:#4834d4;border:none;padding:12px 24px;cursor:pointer;border-radius:4px;font-weight:500;transition:background-color .3s}.addFileButton_e245bf59:hover{background-color:#3d2db8}.rightSection_e245bf59{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:end;align-items:flex-end;gap:20px}.leadership_e245bf59{font-size:18px;color:#fff;font-weight:500;font-family:Inter,sans-serif}.searchContainer_e245bf59{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;background-color:#fff;border-radius:4px;padding:8px 16px;min-width:300px}.searchIcon_e245bf59{width:18px;height:18px;margin-right:10px;-ms-flex-negative:0;flex-shrink:0}.searchInput_e245bf59{border:none;outline:0;-ms-flex:1;flex:1;font-size:16px;color:#333;background:0 0;font-family:Inter,sans-serif;font-weight:400}.searchInput_e245bf59:-ms-input-placeholder{color:#999}.searchInput:-ms-input-placeholder{color:#999}.searchInput_e245bf59::placeholder{color:#999}", ""]);


/***/ }),

/***/ "0xsj":
/*!***********************************************************************************************!*\
  !*** ./lib/webparts/migration/pages/ClientTestimonialsPage/ClientTestimonialsPage.module.css ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!../../../../../node_modules/postcss-loader/src??postcss!./ClientTestimonialsPage.module.css */ "GwCf");
var loader = __webpack_require__(/*! ./node_modules/@microsoft/loader-load-themed-styles/node_modules/@microsoft/load-themed-styles/lib/index.js */ "ruv1");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "26ea":
/*!**********************************************!*\
  !*** external "@microsoft/sp-property-pane" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__26ea__;

/***/ }),

/***/ "2SQp":
/*!************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??postcss!./lib/webparts/migration/pages/AboutPage/AboutPage.module.css ***!
  \************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/runtime/api.js */ "Z+AG")(false);
// Module
exports.push([module.i, ".aboutPage_afa5522c{width:100%;background-color:#e3f2fd;padding:40px 60px;box-sizing:border-box;height:330px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;font-family:Inter,sans-serif}.contentContainer_afa5522c{text-align:center;max-width:1400px;margin:0 auto}.contentText_afa5522c{font-size:24px;color:#424242;margin:0 0 30px 0;font-weight:400;font-family:Inter,sans-serif}.carouselIndicators_afa5522c{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;gap:12px;margin-top:20px}.dot_afa5522c{width:12px;height:12px;border-radius:50%;background-color:#90caf9;cursor:pointer;transition:transform .3s,background-color .3s}.dot_afa5522c:hover{transform:scale(1.2);background-color:#64b5f6}.dot_afa5522c.active_afa5522c{background-color:#1976d2}", ""]);


/***/ }),

/***/ "59cD":
/*!***************************************************************************************************!*\
  !*** ./lib/webparts/migration/pages/ClientTestimonialsPage/ClientTestimonialsPage.module.scss.js ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./ClientTestimonialsPage.module.css */ "0xsj");
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
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "5DjF":
/*!********************************************************************!*\
  !*** ./lib/webparts/migration/components/Header/Header.module.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!../../../../../node_modules/postcss-loader/src??postcss!./Header.module.css */ "0EeX");
var loader = __webpack_require__(/*! ./node_modules/@microsoft/loader-load-themed-styles/node_modules/@microsoft/load-themed-styles/lib/index.js */ "ruv1");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "6hHN":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??postcss!./lib/webparts/migration/components/BUContentArea/BUContentArea.module.css ***!
  \*************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/runtime/api.js */ "Z+AG")(false);
// Module
exports.push([module.i, ".contentArea_bb56a150{width:100%;background-color:#e3f2fd;padding:40px 60px;box-sizing:border-box;height:330px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;font-family:Inter,sans-serif}.contentContainer_bb56a150{text-align:center;max-width:1400px;margin:0 auto}.contentText_bb56a150{font-size:24px;color:#424242;margin:0 0 30px 0;font-weight:400;font-family:Inter,sans-serif}", ""]);


/***/ }),

/***/ "8gNx":
/*!********************************************************************************!*\
  !*** ./lib/webparts/migration/components/BUNavigation/BUNavigation.module.css ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!../../../../../node_modules/postcss-loader/src??postcss!./BUNavigation.module.css */ "8s2d");
var loader = __webpack_require__(/*! ./node_modules/@microsoft/loader-load-themed-styles/node_modules/@microsoft/load-themed-styles/lib/index.js */ "ruv1");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "8s2d":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??postcss!./lib/webparts/migration/components/BUNavigation/BUNavigation.module.css ***!
  \***********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/runtime/api.js */ "Z+AG")(false);
// Module
exports.push([module.i, ".buNavigation_62aa4de0{width:100%;background-color:#e3f2fd;padding:0;box-shadow:0 2px 4px rgba(0,0,0,.1);font-family:Inter,sans-serif}.navContainer_62aa4de0{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;max-width:1400px;margin:0 auto;padding:0 60px;gap:0}.navItem_62aa4de0{padding:16px 24px;text-decoration:none;color:#424242;font-size:16px;font-weight:500;font-family:Inter,sans-serif;transition:background-color .3s;border-bottom:3px solid transparent}.navItem_62aa4de0:hover{background-color:hsla(0,0%,100%,.5)}.navItem_62aa4de0.active_62aa4de0{background-color:#81d4fa;color:#424242;border-bottom:3px solid #1976d2}.dottedLine_62aa4de0{width:100%;height:2px;border-top:2px dotted #90caf9;margin-top:0;background-color:transparent}", ""]);


/***/ }),

/***/ "9aP4":
/*!*****************************************************************!*\
  !*** ./lib/webparts/migration/pages/WhosWhoPage/WhosWhoPage.js ***!
  \*****************************************************************/
/*! exports provided: WhosWhoPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WhosWhoPage", function() { return WhosWhoPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _WhosWhoPage_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WhosWhoPage.module.scss */ "WzzZ");


var WhosWhoPage = function (props) {
    var _a = react__WEBPACK_IMPORTED_MODULE_0__["useState"]('BU 1'), activeBU = _a[0], setActiveBU = _a[1];
    var buButtons = ['ECS', 'EM', 'Clinical', 'OA', 'Global Ops'];
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _WhosWhoPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].whosWhoPage },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _WhosWhoPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].contentContainer },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _WhosWhoPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].buFilters }, buButtons.map(function (bu) { return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { key: bu, onClick: function () { return setActiveBU(bu); }, className: "".concat(_WhosWhoPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].buFilterButton, " ").concat(activeBU === bu ? _WhosWhoPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].active : '') }, bu)); })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _WhosWhoPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].mainContentBlock },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { className: _WhosWhoPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].contentText }, "BU Head | SL 1 | SL 2 | SL 3 | SL 4 | SL 5")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _WhosWhoPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].carouselIndicators },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: _WhosWhoPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dot }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: "".concat(_WhosWhoPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dot, " ").concat(_WhosWhoPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].active) }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: _WhosWhoPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dot })))));
};


/***/ }),

/***/ "9aec":
/*!********************************************************************!*\
  !*** ./lib/webparts/migration/components/Navigation/Navigation.js ***!
  \********************************************************************/
/*! exports provided: Navigation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Navigation", function() { return Navigation; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Navigation_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Navigation.module.scss */ "MTKi");


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
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("nav", { className: _Navigation_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].navigation },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _Navigation_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].navContainer }, navItems.map(function (item) { return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { key: item.id, href: "#", onClick: function (e) { return handleClick(e, item.id); }, className: "".concat(_Navigation_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].navItem, " ").concat(props.activePage === item.id ? _Navigation_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].active : '') }, item.label)); }))));
};


/***/ }),

/***/ "9d9H":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??postcss!./lib/webparts/migration/components/MetadataForm/MetadataForm.module.css ***!
  \***********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/runtime/api.js */ "Z+AG")(false);
// Module
exports.push([module.i, ".formWrapper_eb48e8e0{background:linear-gradient(180deg,#f7f9fb,#fff);padding:24px 20px 24px 28px;border-radius:12px;width:min(820px,96vw);margin:22px auto;box-shadow:0 18px 40px rgba(31,43,70,.08);max-height:calc(100vh - 110px);overflow:hidden;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;position:relative}.formInner_eb48e8e0{-ms-flex:1 1 auto;flex:1 1 auto;min-height:0;overflow-y:auto;-webkit-overflow-scrolling:touch;padding-right:8px;padding-left:8px;max-height:calc(100vh - 220px)}.note_eb48e8e0{font-size:13px;color:#444;margin-bottom:6px}.headerBar_eb48e8e0{background:0 0;padding:10px 0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:12px;position:relative}.cardMeta_eb48e8e0{padding:16px;background:0 0}.field_eb48e8e0{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.title_eb48e8e0{font-size:28px;margin:0;font-weight:800;color:#0f2133}.titleWrap_eb48e8e0{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start}.subtitle_eb48e8e0{font-size:13px;color:#5b6b7a;margin-top:6px;font-weight:600}.closeBtn_eb48e8e0{background:#fff;border:1px solid rgba(15,33,51,.06);color:#0f2133;width:44px;height:44px;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;border-radius:50%;box-shadow:0 6px 18px rgba(15,33,51,.06);font-size:18px;line-height:1;cursor:pointer;position:absolute;top:24px;right:20px;z-index:40}.fieldFull_eb48e8e0{grid-column:1/-1;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.label_eb48e8e0{font-size:15px;color:#1b3752;margin-bottom:8px;font-weight:700}.input_eb48e8e0{padding:10px 12px;font-size:15px;border:1px solid rgba(15,33,51,.12);border-radius:8px;background:#fff;color:#6b7280;font-weight:500;transition:border-color .14s,box-shadow .14s,transform 60ms}.input_eb48e8e0:-ms-input-placeholder{color:#9ca3af;opacity:1}.input:-ms-input-placeholder{color:#9ca3af;opacity:1}.input_eb48e8e0::placeholder{color:#9ca3af;opacity:1}.input_eb48e8e0:focus{border-color:rgba(108,92,231,.9);box-shadow:0 12px 30px rgba(76,63,203,.08);outline:0;transform:translateY(-2px)}.textarea_eb48e8e0{padding:14px;min-height:110px;font-size:15px;resize:vertical;border:1px solid rgba(15,33,51,.12);border-radius:8px;color:#6b7280;font-weight:500}.textarea_eb48e8e0:-ms-input-placeholder{color:#9ca3af;opacity:1}.textarea:-ms-input-placeholder{color:#9ca3af;opacity:1}.textarea_eb48e8e0::placeholder{color:#9ca3af;opacity:1}.textarea_eb48e8e0:focus{border-color:#6c5ce7;box-shadow:0 8px 24px rgba(108,92,231,.08);outline:0}.textareaScrollable_eb48e8e0{padding:14px;min-height:110px;max-height:200px;font-size:14px;resize:none;overflow-y:auto;border:1px solid rgba(15,33,51,.12);border-radius:8px;color:#6b7280;font-weight:500;font-family:Courier New,monospace;line-height:1.6}.textareaScrollable_eb48e8e0:-ms-input-placeholder{color:#9ca3af;opacity:1}.textareaScrollable:-ms-input-placeholder{color:#9ca3af;opacity:1}.textareaScrollable_eb48e8e0::placeholder{color:#9ca3af;opacity:1}.textareaScrollable_eb48e8e0:focus{border-color:#6c5ce7;box-shadow:0 8px 24px rgba(108,92,231,.08);outline:0}.textareaScrollable_eb48e8e0::-webkit-scrollbar{width:8px}.textareaScrollable_eb48e8e0::-webkit-scrollbar-thumb{background:rgba(108,92,231,.32);border-radius:8px}.textareaScrollable_eb48e8e0::-webkit-scrollbar-thumb:hover{background:rgba(108,92,231,.46)}.textareaScrollable_eb48e8e0::-webkit-scrollbar-track{background:rgba(15,33,51,.03)}.grid_eb48e8e0{display:grid;grid-template-columns:1fr 1fr;gap:16px 18px;-ms-flex-align:start;align-items:start}.actions_eb48e8e0{display:-ms-flexbox;display:flex;-ms-flex-pack:end;justify-content:flex-end;margin-top:8px;position:sticky;bottom:0;background:linear-gradient(180deg,hsla(0,0%,100%,.95),#fff);padding-top:8px;padding-bottom:8px;z-index:5}.submitBtn_eb48e8e0{padding:12px 20px;background:linear-gradient(90deg,#6c5ce7,#4834d4);color:#fff;font-size:15px;border:none;border-radius:10px;cursor:pointer;font-weight:700;box-shadow:0 8px 20px rgba(72,52,212,.14)}.submitBtn_eb48e8e0:hover{transform:translateY(-2px)}@media (max-width:640px){.grid_eb48e8e0{grid-template-columns:1fr}}.formInner_eb48e8e0::-webkit-scrollbar{width:8px}.formInner_eb48e8e0::-webkit-scrollbar-thumb{background:rgba(108,92,231,.32);border-radius:8px;backdrop-filter:blur(2px)}.formInner_eb48e8e0::-webkit-scrollbar-thumb:hover{background:rgba(108,92,231,.46)}.formInner_eb48e8e0::-webkit-scrollbar-track{background:rgba(15,33,51,.03)}.formInner_eb48e8e0{scrollbar-color:rgba(108,92,231,.32) rgba(15,33,51,.03);scrollbar-width:thin}", ""]);


/***/ }),

/***/ "A50K":
/*!****************************************************!*\
  !*** ./lib/webparts/migration/MigrationWebPart.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "faye");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_property_pane__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-property-pane */ "26ea");
/* harmony import */ var _microsoft_sp_property_pane__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_property_pane__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/sp-webpart-base */ "br4S");
/* harmony import */ var _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var MigrationWebPartStrings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! MigrationWebPartStrings */ "bgOf");
/* harmony import */ var MigrationWebPartStrings__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(MigrationWebPartStrings__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_Migration__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/Migration */ "iv02");
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
        var element = react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_Migration__WEBPACK_IMPORTED_MODULE_6__["default"], {
            description: this.properties.description,
            context: this.context
        });
        react_dom__WEBPACK_IMPORTED_MODULE_1__["render"](element, this.domElement);
    };
    MigrationWebPart.prototype.onDispose = function () {
        react_dom__WEBPACK_IMPORTED_MODULE_1__["unmountComponentAtNode"](this.domElement);
    };
    Object.defineProperty(MigrationWebPart.prototype, "dataVersion", {
        get: function () {
            return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__["Version"].parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    MigrationWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: MigrationWebPartStrings__WEBPACK_IMPORTED_MODULE_5__["PropertyPaneDescription"]
                    },
                    groups: [
                        {
                            groupName: MigrationWebPartStrings__WEBPACK_IMPORTED_MODULE_5__["BasicGroupName"],
                            groupFields: [
                                Object(_microsoft_sp_property_pane__WEBPACK_IMPORTED_MODULE_3__["PropertyPaneTextField"])('description', {
                                    label: MigrationWebPartStrings__WEBPACK_IMPORTED_MODULE_5__["DescriptionFieldLabel"]
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return MigrationWebPart;
}(_microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_4__["BaseClientSideWebPart"]));
/* harmony default export */ __webpack_exports__["default"] = (MigrationWebPart);


/***/ }),

/***/ "AP5B":
/*!********************************************************************!*\
  !*** ./lib/webparts/migration/components/Footer/Footer.module.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!../../../../../node_modules/postcss-loader/src??postcss!./Footer.module.css */ "Dou5");
var loader = __webpack_require__(/*! ./node_modules/@microsoft/loader-load-themed-styles/node_modules/@microsoft/load-themed-styles/lib/index.js */ "ruv1");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "BYIJ":
/*!**************************************************************************!*\
  !*** ./lib/webparts/migration/components/BUContentArea/BUContentArea.js ***!
  \**************************************************************************/
/*! exports provided: BUContentArea */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BUContentArea", function() { return BUContentArea; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pages_AboutPage_AboutPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../pages/AboutPage/AboutPage */ "PYhF");
/* harmony import */ var _pages_ServiceLinesPage_ServiceLinesPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../pages/ServiceLinesPage/ServiceLinesPage */ "qZeT");
/* harmony import */ var _pages_ClientTestimonialsPage_ClientTestimonialsPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../pages/ClientTestimonialsPage/ClientTestimonialsPage */ "clGQ");
/* harmony import */ var _pages_WhosWhoPage_WhosWhoPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../pages/WhosWhoPage/WhosWhoPage */ "9aP4");
/* harmony import */ var _pages_CommunityPage_CommunityPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../pages/CommunityPage/CommunityPage */ "YN5+");
/* harmony import */ var _pages_QuickLinksPage_QuickLinksPage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../pages/QuickLinksPage/QuickLinksPage */ "e9LQ");
/* harmony import */ var _BUContentArea_module_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./BUContentArea.module.scss */ "FT18");








var BUContentArea = function (props) {
    var renderContent = function () {
        switch (props.activePage) {
            case 'about':
                return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_pages_AboutPage_AboutPage__WEBPACK_IMPORTED_MODULE_1__["AboutPage"], { context: props.context });
            case 'servicelines':
                return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_pages_ServiceLinesPage_ServiceLinesPage__WEBPACK_IMPORTED_MODULE_2__["ServiceLinesPage"], { context: props.context });
            case 'testimonials':
                return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_pages_ClientTestimonialsPage_ClientTestimonialsPage__WEBPACK_IMPORTED_MODULE_3__["ClientTestimonialsPage"], { context: props.context });
            case 'whoswho':
                return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_pages_WhosWhoPage_WhosWhoPage__WEBPACK_IMPORTED_MODULE_4__["WhosWhoPage"], { context: props.context });
            case 'community':
                return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_pages_CommunityPage_CommunityPage__WEBPACK_IMPORTED_MODULE_5__["CommunityPage"], { context: props.context });
            case 'quicklinks':
                return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_pages_QuickLinksPage_QuickLinksPage__WEBPACK_IMPORTED_MODULE_6__["QuickLinksPage"], { context: props.context });
            default:
                return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _BUContentArea_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].contentArea },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _BUContentArea_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].contentContainer },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { className: _BUContentArea_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].contentText },
                            "Content for ",
                            props.activePage,
                            " will be displayed here."))));
        }
    };
    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, renderContent());
};


/***/ }),

/***/ "CbzZ":
/*!*********************************************************************************!*\
  !*** ./lib/webparts/migration/pages/CommunityPage/CommunityPage.module.scss.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./CommunityPage.module.css */ "xn79");
var styles = {
    communityPage: 'communityPage_01d0c138',
    contentContainer: 'contentContainer_01d0c138',
    communitiesGrid: 'communitiesGrid_01d0c138',
    communityCard: 'communityCard_01d0c138',
    communityText: 'communityText_01d0c138'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "Czgg":
/*!*********************************************************************!*\
  !*** ./lib/webparts/migration/pages/AboutPage/AboutPage.module.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!../../../../../node_modules/postcss-loader/src??postcss!./AboutPage.module.css */ "2SQp");
var loader = __webpack_require__(/*! ./node_modules/@microsoft/loader-load-themed-styles/node_modules/@microsoft/load-themed-styles/lib/index.js */ "ruv1");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "D3Pe":
/*!*********************************************************!*\
  !*** ./lib/webparts/migration/pages/BUsPage/BUsPage.js ***!
  \*********************************************************/
/*! exports provided: BUsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BUsPage", function() { return BUsPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BUsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BUsPage.module.scss */ "dTwc");


var BUsPage = function (props) {
    var buButtons = ['ECS', 'EM', 'Clinical', 'OA', 'Global Ops'];
    var handleBUClick = function (buName) {
        if (props.onBUClick) {
            props.onBUClick(buName);
        }
    };
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _BUsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].busPage },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _BUsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].contentContainer },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _BUsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].buttonsGrid }, buButtons.map(function (bu, index) { return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { key: index, className: _BUsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].buButton, onClick: function () { return handleBUClick(bu); } }, bu)); })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _BUsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].carouselIndicators },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: "".concat(_BUsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dot, " ").concat(_BUsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].active) }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: _BUsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dot }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: _BUsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dot })))));
};


/***/ }),

/***/ "D8py":
/*!************************************************************************!*\
  !*** ./lib/webparts/migration/components/Header/Header.module.scss.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./Header.module.css */ "5DjF");
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
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "Dou5":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??postcss!./lib/webparts/migration/components/Footer/Footer.module.css ***!
  \***********************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/runtime/api.js */ "Z+AG")(false);
// Module
exports.push([module.i, ".footer_49b3a56d{width:100%;background-color:#fff;padding:20px 60px;box-sizing:border-box;border-top:1px solid #e0e0e0;font-family:Inter,sans-serif}.footerContainer_49b3a56d{max-width:1400px;margin:0 auto}.logoContainer_49b3a56d{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:8px}.logoSquare_49b3a56d{width:12px;height:12px;background-color:#1976d2;-ms-flex-negative:0;flex-shrink:0}.logoText_49b3a56d{font-size:18px;color:#1976d2;font-weight:500;font-family:Inter,sans-serif;text-transform:lowercase;letter-spacing:.5px}", ""]);


/***/ }),

/***/ "FCkr":
/*!**********************************************************************************************!*\
  !*** ./lib/webparts/migration/components/BUQuestionSection/BUQuestionSection.module.scss.js ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./BUQuestionSection.module.css */ "lGgc");
var styles = {
    questionSection: 'questionSection_6f50e07b',
    questionContainer: 'questionContainer_6f50e07b',
    leftPrompt: 'leftPrompt_6f50e07b',
    promptText: 'promptText_6f50e07b',
    rightInput: 'rightInput_6f50e07b',
    questionInput: 'questionInput_6f50e07b'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "FDHe":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??postcss!./lib/webparts/migration/components/QuestionSection/QuestionSection.module.css ***!
  \*****************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/runtime/api.js */ "Z+AG")(false);
// Module
exports.push([module.i, ".questionSection_fc045cad{width:100%;background:linear-gradient(90deg,#ff6b9d 0,#c44569 30%,#6c5ce7 70%,#4834d4);padding:40px 60px;box-sizing:border-box;font-family:Inter,sans-serif}.questionContainer_fc045cad{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;max-width:1400px;margin:0 auto;gap:30px}.leftPrompt_fc045cad{-ms-flex-negative:0;flex-shrink:0}.promptText_fc045cad{font-size:20px;color:#fff;margin:0;font-weight:500;font-family:Inter,sans-serif;white-space:nowrap}.rightInput_fc045cad{-ms-flex:1;flex:1;max-width:600px}.questionInput_fc045cad{width:100%;padding:16px 20px;border:none;border-radius:6px;font-size:16px;background-color:#fff;color:#333;box-sizing:border-box;outline:0;box-shadow:0 2px 8px rgba(0,0,0,.1);font-family:Inter,sans-serif;font-weight:400}.questionInput_fc045cad:-ms-input-placeholder{color:#999}.questionInput:-ms-input-placeholder{color:#999}.questionInput_fc045cad::placeholder{color:#999}.questionInput_fc045cad:focus{box-shadow:0 2px 12px rgba(0,0,0,.15)}", ""]);


/***/ }),

/***/ "FT18":
/*!**************************************************************************************!*\
  !*** ./lib/webparts/migration/components/BUContentArea/BUContentArea.module.scss.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./BUContentArea.module.css */ "z0tS");
var styles = {
    contentArea: 'contentArea_bb56a150',
    contentContainer: 'contentContainer_bb56a150',
    contentText: 'contentText_bb56a150'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "FfgT":
/*!********************************************************************!*\
  !*** ./lib/webparts/migration/components/Migration.module.scss.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./Migration.module.css */ "iRJX");
var styles = {
    migration: 'migration_c01701c8'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "Gqvk":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??postcss!./lib/webparts/migration/components/BUQuestionSection/BUQuestionSection.module.css ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/runtime/api.js */ "Z+AG")(false);
// Module
exports.push([module.i, ".questionSection_6f50e07b{width:100%;background-color:#1976d2;padding:40px 60px;box-sizing:border-box;font-family:Inter,sans-serif}.questionContainer_6f50e07b{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;max-width:1400px;margin:0 auto;gap:30px}.leftPrompt_6f50e07b{-ms-flex-negative:0;flex-shrink:0}.promptText_6f50e07b{font-size:20px;color:#fff;margin:0;font-weight:500;font-family:Inter,sans-serif;white-space:nowrap}.rightInput_6f50e07b{-ms-flex:1;flex:1;max-width:600px}.questionInput_6f50e07b{width:100%;padding:16px 20px;border:none;border-radius:6px;font-size:16px;background-color:#fff;color:#333;box-sizing:border-box;outline:0;box-shadow:0 2px 8px rgba(0,0,0,.1);font-family:Inter,sans-serif;font-weight:400}.questionInput_6f50e07b:-ms-input-placeholder{color:#999}.questionInput:-ms-input-placeholder{color:#999}.questionInput_6f50e07b::placeholder{color:#999}.questionInput_6f50e07b:focus{box-shadow:0 2px 12px rgba(0,0,0,.15)}", ""]);


/***/ }),

/***/ "GwCf":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??postcss!./lib/webparts/migration/pages/ClientTestimonialsPage/ClientTestimonialsPage.module.css ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/runtime/api.js */ "Z+AG")(false);
// Module
exports.push([module.i, ".testimonialsPage_6a9a225d{width:100%;background-color:#e3f2fd;padding:40px 60px;box-sizing:border-box;height:330px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;font-family:Inter,sans-serif;overflow-x:hidden}.contentContainer_6a9a225d{max-width:1400px;margin:0 auto;width:100%;box-sizing:border-box}.testimonialsGrid_6a9a225d{display:grid;grid-template-columns:repeat(5,1fr);gap:15px;margin-bottom:20px;width:100%;box-sizing:border-box}@media (max-width:1400px){.testimonialsGrid_6a9a225d{grid-template-columns:repeat(3,1fr)}}@media (max-width:768px){.testimonialsGrid_6a9a225d{grid-template-columns:repeat(2,1fr)}}@media (max-width:480px){.testimonialsGrid_6a9a225d{grid-template-columns:1fr}}.testimonialCard_6a9a225d{background-color:#64b5f6;padding:30px 15px;border-radius:6px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;min-height:150px;text-align:center;box-sizing:border-box;width:100%;max-width:100%;overflow:hidden}.testimonialText_6a9a225d{font-size:16px;color:#fff;font-weight:400;font-family:Inter,sans-serif;margin:0;line-height:1.5;word-wrap:break-word;overflow-wrap:break-word}.carouselIndicators_6a9a225d{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;gap:12px;margin-top:20px}.dot_6a9a225d{width:12px;height:12px;border-radius:50%;background-color:#90caf9;cursor:pointer;transition:transform .3s,background-color .3s}.dot_6a9a225d:hover{transform:scale(1.2);background-color:#64b5f6}.dot_6a9a225d.active_6a9a225d{background-color:#1976d2;width:14px;height:14px}", ""]);


/***/ }),

/***/ "HdWn":
/*!******************************************************************************************!*\
  !*** ./lib/webparts/migration/components/QuestionSection/QuestionSection.module.scss.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./QuestionSection.module.css */ "rmnS");
var styles = {
    questionSection: 'questionSection_fc045cad',
    questionContainer: 'questionContainer_fc045cad',
    leftPrompt: 'leftPrompt_fc045cad',
    promptText: 'promptText_fc045cad',
    rightInput: 'rightInput_fc045cad',
    questionInput: 'questionInput_fc045cad'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "HuwO":
/*!************************************************************************!*\
  !*** ./lib/webparts/migration/components/BUNavigation/BUNavigation.js ***!
  \************************************************************************/
/*! exports provided: BUNavigation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BUNavigation", function() { return BUNavigation; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BUNavigation_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BUNavigation.module.scss */ "MLUz");


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
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("nav", { className: _BUNavigation_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].buNavigation },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _BUNavigation_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].navContainer }, navItems.map(function (item) { return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { key: item.id, href: "#", onClick: function (e) { return handleClick(e, item.id); }, className: "".concat(_BUNavigation_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].navItem, " ").concat(props.activePage === item.id ? _BUNavigation_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].active : '') }, item.label)); })),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _BUNavigation_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dottedLine })));
};


/***/ }),

/***/ "IE/4":
/*!**********************************************************************************!*\
  !*** ./lib/webparts/migration/components/ContentArea/ContentArea.module.scss.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./ContentArea.module.css */ "excW");
var styles = {
    contentArea: 'contentArea_e198527e',
    contentContainer: 'contentContainer_e198527e',
    contentText: 'contentText_e198527e',
    carouselIndicators: 'carouselIndicators_e198527e',
    dot: 'dot_e198527e',
    active: 'active_e198527e'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "ITcl":
/*!****************************************************************************!*\
  !*** ./lib/webparts/migration/components/Navigation/Navigation.module.css ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!../../../../../node_modules/postcss-loader/src??postcss!./Navigation.module.css */ "Juqx");
var loader = __webpack_require__(/*! ./node_modules/@microsoft/loader-load-themed-styles/node_modules/@microsoft/load-themed-styles/lib/index.js */ "ruv1");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "Juqx":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??postcss!./lib/webparts/migration/components/Navigation/Navigation.module.css ***!
  \*******************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/runtime/api.js */ "Z+AG")(false);
// Module
exports.push([module.i, ".navigation_e0b26b5e{width:100%;background-color:#e3f2fd;padding:0;box-shadow:0 2px 4px rgba(0,0,0,.1);font-family:Inter,sans-serif}.navContainer_e0b26b5e{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;max-width:1400px;margin:0 auto;padding:0 60px;gap:0}.navItem_e0b26b5e{padding:16px 24px;text-decoration:none;color:#424242;font-size:16px;font-weight:500;font-family:Inter,sans-serif;transition:background-color .3s;border-bottom:3px solid transparent}.navItem_e0b26b5e:hover{background-color:hsla(0,0%,100%,.5)}.navItem_e0b26b5e.active_e0b26b5e{background-color:#81d4fa;color:#424242;border-bottom:3px solid #1976d2}", ""]);


/***/ }),

/***/ "KKW/":
/*!************************************************************************!*\
  !*** ./lib/webparts/migration/components/BUDetailPage/BUDetailPage.js ***!
  \************************************************************************/
/*! exports provided: BUDetailPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BUDetailPage", function() { return BUDetailPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BUHeader_BUHeader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BUHeader/BUHeader */ "hx5O");
/* harmony import */ var _BUNavigation_BUNavigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../BUNavigation/BUNavigation */ "HuwO");
/* harmony import */ var _BUContentArea_BUContentArea__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../BUContentArea/BUContentArea */ "BYIJ");
/* harmony import */ var _BUQuestionSection_BUQuestionSection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../BUQuestionSection/BUQuestionSection */ "nzr9");
/* harmony import */ var _Footer_Footer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Footer/Footer */ "ZWc6");
/* harmony import */ var _BUDetailPage_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./BUDetailPage.module.scss */ "g8ea");







var BUDetailPage = function (props) {
    var _a = react__WEBPACK_IMPORTED_MODULE_0__["useState"]('about'), activePage = _a[0], setActivePage = _a[1];
    var handleNavClick = function (page) {
        setActivePage(page);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _BUDetailPage_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].buDetailPage },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_BUHeader_BUHeader__WEBPACK_IMPORTED_MODULE_1__["BUHeader"], { buName: props.buName, onBack: props.onBack }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_BUNavigation_BUNavigation__WEBPACK_IMPORTED_MODULE_2__["BUNavigation"], { activePage: activePage, onNavClick: handleNavClick }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_BUContentArea_BUContentArea__WEBPACK_IMPORTED_MODULE_3__["BUContentArea"], { activePage: activePage, context: props.context }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_BUQuestionSection_BUQuestionSection__WEBPACK_IMPORTED_MODULE_4__["BUQuestionSection"], null),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Footer_Footer__WEBPACK_IMPORTED_MODULE_5__["Footer"], null)));
};


/***/ }),

/***/ "MLUz":
/*!************************************************************************************!*\
  !*** ./lib/webparts/migration/components/BUNavigation/BUNavigation.module.scss.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./BUNavigation.module.css */ "8gNx");
var styles = {
    buNavigation: 'buNavigation_62aa4de0',
    navContainer: 'navContainer_62aa4de0',
    navItem: 'navItem_62aa4de0',
    active: 'active_62aa4de0',
    dottedLine: 'dottedLine_62aa4de0'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "MTKi":
/*!********************************************************************************!*\
  !*** ./lib/webparts/migration/components/Navigation/Navigation.module.scss.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./Navigation.module.css */ "ITcl");
var styles = {
    navigation: 'navigation_e0b26b5e',
    navContainer: 'navContainer_e0b26b5e',
    navItem: 'navItem_e0b26b5e',
    active: 'active_e0b26b5e'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "MfTk":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??postcss!./lib/webparts/migration/pages/QuickLinksPage/QuickLinksPage.module.css ***!
  \**********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/runtime/api.js */ "Z+AG")(false);
// Module
exports.push([module.i, ".quickLinksPage_19320504{width:100%;background-color:#e3f2fd;padding:40px 60px;box-sizing:border-box;height:330px;font-family:Inter,sans-serif}.pageContainer_19320504{max-width:1400px;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.pageContainer_19320504,.quickLinksSidebar_19320504{margin:0 auto;display:-ms-flexbox;display:flex;box-sizing:border-box;height:100%}.quickLinksSidebar_19320504{background-color:#bbdefb;padding:20px 15px;border-radius:6px;width:300px;-ms-flex-direction:column;flex-direction:column;overflow:hidden}@media (max-width:1024px){.quickLinksSidebar_19320504{width:100%;height:auto;min-height:300px}}.sidebarTitle_19320504{font-size:18px;font-weight:700;color:#1976d2;font-family:Inter,sans-serif;margin:0 0 15px 0;padding-bottom:12px;border-bottom:2px solid #90caf9;-ms-flex-negative:0;flex-shrink:0}.linksList_19320504{list-style:none;padding:0;margin:0;-ms-flex:1;flex:1;overflow-y:auto;overflow-x:hidden}.linkItem_19320504{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:8px 0;text-decoration:none;color:#1976d2;font-size:15px;font-weight:500;font-family:Inter,sans-serif;transition:color .3s,transform .2s;cursor:pointer}.linkItem_19320504:hover{color:#1565c0;transform:translateX(5px)}.linkItem_19320504:active{transform:translateX(3px)}.linkArrow_19320504{margin-right:10px;font-weight:600;font-size:18px;color:#1976d2;transition:color .3s}.linkItem_19320504:hover .linkArrow_19320504{color:#1565c0}", ""]);


/***/ }),

/***/ "N9u2":
/*!****************************************************************************!*\
  !*** ./lib/webparts/migration/components/BUHeader/BUHeader.module.scss.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./BUHeader.module.css */ "jdzR");
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
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "NrAi":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??postcss!./lib/webparts/migration/pages/WhosWhoPage/WhosWhoPage.module.css ***!
  \****************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/runtime/api.js */ "Z+AG")(false);
// Module
exports.push([module.i, ".whosWhoPage_e154758d{width:100%;background-color:#e3f2fd;padding:40px 60px;box-sizing:border-box;height:330px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;font-family:Inter,sans-serif}.contentContainer_e154758d{max-width:1400px;margin:0 auto;width:100%;box-sizing:border-box}.buFilters_e154758d{display:-ms-flexbox;display:flex;gap:15px;margin-bottom:20px;-ms-flex-pack:center;justify-content:center;-ms-flex-wrap:wrap;flex-wrap:wrap}.buFilterButton_e154758d{background-color:#90caf9;color:#fff;border:none;padding:12px 24px;font-size:16px;font-weight:500;font-family:Inter,sans-serif;border-radius:4px;cursor:pointer;transition:background-color .3s,transform .2s;min-width:80px}.buFilterButton_e154758d:hover{background-color:#64b5f6;transform:translateY(-2px)}.buFilterButton_e154758d:active{transform:translateY(0)}.buFilterButton_e154758d.active_e154758d{background-color:#1976d2;font-weight:600}.mainContentBlock_e154758d{background-color:#1976d2;padding:60px 40px;border-radius:6px;margin-bottom:20px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;min-height:200px;box-sizing:border-box}.contentText_e154758d{font-size:20px;color:#fff;font-weight:500;font-family:Inter,sans-serif;margin:0;text-align:center;letter-spacing:.5px}.carouselIndicators_e154758d{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;gap:12px;margin-top:20px}.dot_e154758d{width:12px;height:12px;border-radius:50%;background-color:#90caf9;cursor:pointer;transition:transform .3s,background-color .3s}.dot_e154758d:hover{transform:scale(1.2);background-color:#64b5f6}.dot_e154758d.active_e154758d{background-color:#1976d2;width:14px;height:14px}", ""]);


/***/ }),

/***/ "OWAP":
/*!********************************************************************************!*\
  !*** ./lib/webparts/migration/components/FileUpload/FileUpload.module.scss.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./FileUpload.module.css */ "UjBF");
var styles = {
    overlay: 'overlay_c09eba7f',
    modal: 'modal_c09eba7f',
    uploadCard: 'uploadCard_c09eba7f',
    title: 'title_c09eba7f',
    dropZone: 'dropZone_c09eba7f',
    dropZoneHover: 'dropZoneHover_c09eba7f',
    uploadIcon: 'uploadIcon_c09eba7f',
    hintText: 'hintText_c09eba7f',
    instructions: 'instructions_c09eba7f',
    browseBtn: 'browseBtn_c09eba7f',
    footer: 'footer_c09eba7f',
    closeBtn: 'closeBtn_c09eba7f',
    fileName: 'fileName_c09eba7f',
    processingContainer: 'processingContainer_c09eba7f',
    processingSpinner: 'processingSpinner_c09eba7f',
    spin: 'spin_c09eba7f',
    processingTitle: 'processingTitle_c09eba7f',
    processingMessage: 'processingMessage_c09eba7f',
    errorMessage: 'errorMessage_c09eba7f'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "PYhF":
/*!*************************************************************!*\
  !*** ./lib/webparts/migration/pages/AboutPage/AboutPage.js ***!
  \*************************************************************/
/*! exports provided: AboutPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutPage", function() { return AboutPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AboutPage_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AboutPage.module.scss */ "bZ1d");


var AboutPage = function (props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _AboutPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].aboutPage },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _AboutPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].contentContainer },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { className: _AboutPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].contentText }, "A detailed writeup on BU, their service offerings, the clients etc."),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _AboutPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].carouselIndicators },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: "".concat(_AboutPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dot, " ").concat(_AboutPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].active) }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: _AboutPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dot }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: _AboutPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dot })))));
};


/***/ }),

/***/ "RFhd":
/*!*******************************************************************************!*\
  !*** ./lib/webparts/migration/pages/QuickLinksPage/QuickLinksPage.module.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!../../../../../node_modules/postcss-loader/src??postcss!./QuickLinksPage.module.css */ "MfTk");
var loader = __webpack_require__(/*! ./node_modules/@microsoft/loader-load-themed-styles/node_modules/@microsoft/load-themed-styles/lib/index.js */ "ruv1");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "RxoZ":
/*!********************************************************************************!*\
  !*** ./lib/webparts/migration/components/BUDetailPage/BUDetailPage.module.css ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!../../../../../node_modules/postcss-loader/src??postcss!./BUDetailPage.module.css */ "oAj4");
var loader = __webpack_require__(/*! ./node_modules/@microsoft/loader-load-themed-styles/node_modules/@microsoft/load-themed-styles/lib/index.js */ "ruv1");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "SHTI":
/*!***************************************************************************************!*\
  !*** ./lib/webparts/migration/pages/ServiceLinesPage/ServiceLinesPage.module.scss.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./ServiceLinesPage.module.css */ "+vjh");
var styles = {
    serviceLinesPage: 'serviceLinesPage_12ef78dc',
    contentContainer: 'contentContainer_12ef78dc',
    buttonsGrid: 'buttonsGrid_12ef78dc',
    slButton: 'slButton_12ef78dc',
    carouselIndicators: 'carouselIndicators_12ef78dc',
    dot: 'dot_12ef78dc',
    active: 'active_12ef78dc'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "UWqr":
/*!*********************************************!*\
  !*** external "@microsoft/sp-core-library" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_UWqr__;

/***/ }),

/***/ "UjBF":
/*!****************************************************************************!*\
  !*** ./lib/webparts/migration/components/FileUpload/FileUpload.module.css ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!../../../../../node_modules/postcss-loader/src??postcss!./FileUpload.module.css */ "wOCq");
var loader = __webpack_require__(/*! ./node_modules/@microsoft/loader-load-themed-styles/node_modules/@microsoft/load-themed-styles/lib/index.js */ "ruv1");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "W28U":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??postcss!./lib/webparts/migration/components/ContentArea/ContentArea.module.css ***!
  \*********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/runtime/api.js */ "Z+AG")(false);
// Module
exports.push([module.i, ".contentArea_e198527e{width:100%;background-color:#e3f2fd;padding:40px 60px;box-sizing:border-box;height:330px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;font-family:Inter,sans-serif}.contentContainer_e198527e{text-align:center;max-width:1400px;margin:0 auto}.contentText_e198527e{font-size:24px;color:#424242;margin:0 0 30px 0;font-weight:400;font-family:Inter,sans-serif}.carouselIndicators_e198527e{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;gap:12px;margin-top:20px}.dot_e198527e{width:12px;height:12px;border-radius:50%;background-color:#90caf9;cursor:pointer;transition:transform .3s,background-color .3s}.dot_e198527e:hover{transform:scale(1.2);background-color:#64b5f6}.dot_e198527e.active_e198527e{background-color:#1976d2}", ""]);


/***/ }),

/***/ "WzzZ":
/*!*****************************************************************************!*\
  !*** ./lib/webparts/migration/pages/WhosWhoPage/WhosWhoPage.module.scss.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./WhosWhoPage.module.css */ "hczH");
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
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "XWkb":
/*!******************************************************************************!*\
  !*** ./lib/webparts/migration/components/QuestionSection/QuestionSection.js ***!
  \******************************************************************************/
/*! exports provided: QuestionSection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionSection", function() { return QuestionSection; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _QuestionSection_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QuestionSection.module.scss */ "HdWn");


var QuestionSection = function (props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _QuestionSection_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].questionSection },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _QuestionSection_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].questionContainer },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _QuestionSection_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].leftPrompt },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { className: _QuestionSection_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].promptText }, "Ask your question here")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _QuestionSection_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].rightInput },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { type: "text", className: _QuestionSection_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].questionInput, placeholder: "Type your question..." })))));
};


/***/ }),

/***/ "XZl5":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??postcss!./lib/webparts/migration/components/Migration.module.css ***!
  \*******************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/runtime/api.js */ "Z+AG")(false);
// Module
exports.push([module.i, ".migration_c01701c8{width:100%;min-height:100vh;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;margin:0;padding:0;font-family:Inter,sans-serif}", ""]);


/***/ }),

/***/ "Y7Lz":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??postcss!./lib/webparts/migration/pages/ServiceLinesPage/ServiceLinesPage.module.css ***!
  \**************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/runtime/api.js */ "Z+AG")(false);
// Module
exports.push([module.i, ".serviceLinesPage_12ef78dc{width:100%;background-color:#e3f2fd;padding:40px 60px;box-sizing:border-box;height:330px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;font-family:Inter,sans-serif}.contentContainer_12ef78dc{max-width:1400px;margin:0 auto;width:100%}.buttonsGrid_12ef78dc{display:grid;grid-template-columns:repeat(5,1fr);gap:20px;margin-bottom:15px;max-width:1000px;margin-left:auto;margin-right:auto}.buttonsGrid_12ef78dc :nth-child(6){grid-column:2}.buttonsGrid_12ef78dc :nth-child(7){grid-column:3}@media (max-width:1200px){.buttonsGrid_12ef78dc{grid-template-columns:repeat(3,1fr);max-width:600px}.buttonsGrid_12ef78dc :nth-child(6),.buttonsGrid_12ef78dc :nth-child(7){grid-column:auto}}@media (max-width:768px){.buttonsGrid_12ef78dc{grid-template-columns:repeat(2,1fr);max-width:400px}.buttonsGrid_12ef78dc :nth-child(6),.buttonsGrid_12ef78dc :nth-child(7){grid-column:auto}}.slButton_12ef78dc{background-color:#1976d2;color:#fff;border:none;padding:20px 30px;font-size:18px;font-weight:500;font-family:Inter,sans-serif;border-radius:4px;cursor:pointer;transition:background-color .3s,transform .2s;min-height:60px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.slButton_12ef78dc:hover{background-color:#1565c0;transform:translateY(-2px)}.slButton_12ef78dc:active{transform:translateY(0)}.carouselIndicators_12ef78dc{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;gap:12px;margin-top:15px}.dot_12ef78dc{width:12px;height:12px;border-radius:50%;background-color:#90caf9;cursor:pointer;transition:transform .3s,background-color .3s}.dot_12ef78dc:hover{transform:scale(1.2);background-color:#64b5f6}.dot_12ef78dc.active_12ef78dc{background-color:#1976d2;width:14px;height:14px}", ""]);


/***/ }),

/***/ "YN5+":
/*!*********************************************************************!*\
  !*** ./lib/webparts/migration/pages/CommunityPage/CommunityPage.js ***!
  \*********************************************************************/
/*! exports provided: CommunityPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommunityPage", function() { return CommunityPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CommunityPage_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CommunityPage.module.scss */ "CbzZ");


var CommunityPage = function (props) {
    var communities = ['Community 1', 'Community 2', 'Community 3'];
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _CommunityPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].communityPage },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _CommunityPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].contentContainer },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _CommunityPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].communitiesGrid }, communities.map(function (community, index) { return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { key: index, className: _CommunityPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].communityCard },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { className: _CommunityPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].communityText }, community))); })))));
};


/***/ }),

/***/ "Z+AG":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/runtime/api.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "Z90R":
/*!************************************************************************!*\
  !*** ./lib/webparts/migration/components/MetadataForm/MetadataForm.js ***!
  \************************************************************************/
/*! exports provided: MetadataForm, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetadataForm", function() { return MetadataForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MetadataForm.module.scss */ "t7aT");
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
    var onSubmit = _a.onSubmit, onClose = _a.onClose, initialValues = _a.initialValues;
    var _b = react__WEBPACK_IMPORTED_MODULE_0__["useState"](__assign({ title: '', abstract: '', bu: '', department: '', region: '', client: '', documentType: '', diseaseArea: '', therapyArea: '', emails: '', phones: '', ids: '', pricing: '', sensitive: '' }, initialValues)), values = _b[0], setValues = _b[1];
    // Update values when initialValues change
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        if (initialValues) {
            setValues(function (prev) { return (__assign(__assign({}, prev), initialValues)); });
        }
    }, [initialValues]);
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
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].formWrapper },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].headerBar },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].titleWrap },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h2", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].title }, "Document Metadata"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].subtitle }, "Add context and tags for better discoverability"))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", "aria-label": "Close", className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].closeBtn, onClick: function () { return onClose && onClose(); }, title: "Close" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": true },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", { d: "M18 6L6 18M6 6l12 12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].cardMeta },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("form", { onSubmit: handleSubmit },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].formInner },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].grid },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].field },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].label, htmlFor: "title" }, "Title"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { id: "title", name: "title", placeholder: "Enter document title", value: values.title, onChange: onChange, className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].input })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].field },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].label, htmlFor: "bu" }, "Business Unit"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { id: "bu", name: "bu", placeholder: "Select or type BU", value: values.bu, onChange: onChange, className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].input })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].field },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].label, htmlFor: "department" }, "Department"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { id: "department", name: "department", placeholder: "Department", value: values.department, onChange: onChange, className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].input })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].field },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].label, htmlFor: "region" }, "Region"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { id: "region", name: "region", placeholder: "Region", value: values.region, onChange: onChange, className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].input })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].field },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].label, htmlFor: "client" }, "Client"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { id: "client", name: "client", placeholder: "Client name", value: values.client, onChange: onChange, className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].input })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].field },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].label, htmlFor: "documentType" }, "Document Type"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { id: "documentType", name: "documentType", placeholder: "e.g., PPTX, Report", value: values.documentType, onChange: onChange, className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].input })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].field },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].label, htmlFor: "diseaseArea" }, "Disease Area"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { id: "diseaseArea", name: "diseaseArea", placeholder: "Disease Area", value: values.diseaseArea, onChange: onChange, className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].input })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].field },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].label, htmlFor: "therapyArea" }, "Therapy Area"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { id: "therapyArea", name: "therapyArea", placeholder: "Therapy Area", value: values.therapyArea, onChange: onChange, className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].input })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].fieldFull },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].label, htmlFor: "abstract" }, "Abstract"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("textarea", { id: "abstract", name: "abstract", placeholder: "Short summary (1-2 lines)", value: values.abstract, onChange: onChange, className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].textarea })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].fieldFull },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].label, htmlFor: "emails" }, "Emails Found"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("textarea", { id: "emails", name: "emails", value: values.emails, onChange: onChange, className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].textareaScrollable })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].fieldFull },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].label, htmlFor: "phones" }, "Phones Found"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("textarea", { id: "phones", name: "phones", value: values.phones, onChange: onChange, className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].textareaScrollable })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].fieldFull },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].label, htmlFor: "ids" }, "IDs Found"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("textarea", { id: "ids", name: "ids", value: values.ids, onChange: onChange, className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].textarea })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].fieldFull },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", { className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].label, htmlFor: "pricing" }, "Pricing / Sensitive Terms"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("textarea", { id: "pricing", name: "pricing", value: values.pricing, onChange: onChange, className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].textarea }))),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { marginTop: 12, display: 'flex', justifyContent: 'flex-end' } },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "submit", className: _MetadataForm_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].submitBtn }, "Submit")))))));
};
/* harmony default export */ __webpack_exports__["default"] = (MetadataForm);


/***/ }),

/***/ "ZWc6":
/*!************************************************************!*\
  !*** ./lib/webparts/migration/components/Footer/Footer.js ***!
  \************************************************************/
/*! exports provided: Footer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Footer", function() { return Footer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Footer_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Footer.module.scss */ "glSY");


var Footer = function (props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("footer", { className: _Footer_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].footer },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _Footer_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].footerContainer },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _Footer_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].logoContainer },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _Footer_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].logoSquare }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: _Footer_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].logoText }, "indegene")))));
};


/***/ }),

/***/ "aC/Q":
/*!**********************************************************************!*\
  !*** ./lib/webparts/migration/components/ContentArea/ContentArea.js ***!
  \**********************************************************************/
/*! exports provided: ContentArea */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentArea", function() { return ContentArea; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pages_AboutPage_AboutPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../pages/AboutPage/AboutPage */ "PYhF");
/* harmony import */ var _pages_BUsPage_BUsPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../pages/BUsPage/BUsPage */ "D3Pe");
/* harmony import */ var _pages_ClientTestimonialsPage_ClientTestimonialsPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../pages/ClientTestimonialsPage/ClientTestimonialsPage */ "clGQ");
/* harmony import */ var _pages_WhosWhoPage_WhosWhoPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../pages/WhosWhoPage/WhosWhoPage */ "9aP4");
/* harmony import */ var _pages_CommunityPage_CommunityPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../pages/CommunityPage/CommunityPage */ "YN5+");
/* harmony import */ var _pages_QuickLinksPage_QuickLinksPage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../pages/QuickLinksPage/QuickLinksPage */ "e9LQ");
/* harmony import */ var _ContentArea_module_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ContentArea.module.scss */ "IE/4");








var ContentArea = function (props) {
    var renderContent = function () {
        switch (props.activePage) {
            case 'about':
                return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_pages_AboutPage_AboutPage__WEBPACK_IMPORTED_MODULE_1__["AboutPage"], { context: props.context });
            case 'bus':
                return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_pages_BUsPage_BUsPage__WEBPACK_IMPORTED_MODULE_2__["BUsPage"], { context: props.context, onBUClick: props.onBUClick });
            case 'testimonials':
                return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_pages_ClientTestimonialsPage_ClientTestimonialsPage__WEBPACK_IMPORTED_MODULE_3__["ClientTestimonialsPage"], { context: props.context });
            case 'whoswho':
                return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_pages_WhosWhoPage_WhosWhoPage__WEBPACK_IMPORTED_MODULE_4__["WhosWhoPage"], { context: props.context });
            case 'community':
                return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_pages_CommunityPage_CommunityPage__WEBPACK_IMPORTED_MODULE_5__["CommunityPage"], { context: props.context });
            case 'quicklinks':
                return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_pages_QuickLinksPage_QuickLinksPage__WEBPACK_IMPORTED_MODULE_6__["QuickLinksPage"], { context: props.context });
            default:
                return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _ContentArea_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].contentArea },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _ContentArea_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].contentContainer },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { className: _ContentArea_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].contentText },
                            "Content for ",
                            props.activePage,
                            " will be displayed here."))));
        }
    };
    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, renderContent());
};


/***/ }),

/***/ "bZ1d":
/*!*************************************************************************!*\
  !*** ./lib/webparts/migration/pages/AboutPage/AboutPage.module.scss.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./AboutPage.module.css */ "Czgg");
var styles = {
    aboutPage: 'aboutPage_afa5522c',
    contentContainer: 'contentContainer_afa5522c',
    contentText: 'contentText_afa5522c',
    carouselIndicators: 'carouselIndicators_afa5522c',
    dot: 'dot_afa5522c',
    active: 'active_afa5522c'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "bgOf":
/*!******************************************!*\
  !*** external "MigrationWebPartStrings" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_bgOf__;

/***/ }),

/***/ "br4S":
/*!*********************************************!*\
  !*** external "@microsoft/sp-webpart-base" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_br4S__;

/***/ }),

/***/ "cDcd":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_cDcd__;

/***/ }),

/***/ "clGQ":
/*!***************************************************************************************!*\
  !*** ./lib/webparts/migration/pages/ClientTestimonialsPage/ClientTestimonialsPage.js ***!
  \***************************************************************************************/
/*! exports provided: ClientTestimonialsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientTestimonialsPage", function() { return ClientTestimonialsPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ClientTestimonialsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ClientTestimonialsPage.module.scss */ "59cD");


var ClientTestimonialsPage = function (props) {
    var testimonials = [1, 2, 3, 4, 5];
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _ClientTestimonialsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].testimonialsPage },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _ClientTestimonialsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].contentContainer },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _ClientTestimonialsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].testimonialsGrid }, testimonials.map(function (index) { return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { key: index, className: _ClientTestimonialsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].testimonialCard },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { className: _ClientTestimonialsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].testimonialText }, "Client Feedback or testimonials."))); })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _ClientTestimonialsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].carouselIndicators },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: _ClientTestimonialsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dot }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: "".concat(_ClientTestimonialsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dot, " ").concat(_ClientTestimonialsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].active) }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: _ClientTestimonialsPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dot })))));
};


/***/ }),

/***/ "dTwc":
/*!*********************************************************************!*\
  !*** ./lib/webparts/migration/pages/BUsPage/BUsPage.module.scss.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./BUsPage.module.css */ "/80R");
var styles = {
    busPage: 'busPage_fcea57b1',
    contentContainer: 'contentContainer_fcea57b1',
    buttonsGrid: 'buttonsGrid_fcea57b1',
    buButton: 'buButton_fcea57b1',
    carouselIndicators: 'carouselIndicators_fcea57b1',
    dot: 'dot_fcea57b1',
    active: 'active_fcea57b1'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "dduH":
/*!***************************************************************!*\
  !*** ./lib/webparts/migration/services/AzureOpenAIService.js ***!
  \***************************************************************/
/*! exports provided: AzureOpenAIService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AzureOpenAIService", function() { return AzureOpenAIService; });
/* harmony import */ var _ValidationConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ValidationConstants */ "+NpX");
/* harmony import */ var _DataMasking__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DataMasking */ "pU7z");
/**
 * Service to interact with Azure OpenAI API
 */
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


var AzureOpenAIService = /** @class */ (function () {
    function AzureOpenAIService(config) {
        this.config = __assign(__assign({}, config), { apiVersion: config.apiVersion || '2024-02-15-preview' });
    }
    /**
     * Extract metadata from document text using GPT-4o
     * Uses chunked processing for large documents
     */
    AzureOpenAIService.prototype.extractMetadata = function (documentText) {
        return __awaiter(this, void 0, void 0, function () {
            var emailRegex, foundEmails, chunkSize, chunks, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        // Log the extracted text for debugging
                        console.log('=== DOCUMENT TEXT EXTRACTED ===');
                        console.log('Total length:', documentText.length, 'characters');
                        console.log('First 1000 chars:', documentText.substring(0, 1000));
                        console.log('Last 1000 chars:', documentText.substring(Math.max(0, documentText.length - 1000)));
                        emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
                        foundEmails = documentText.match(emailRegex);
                        console.log('=== EMAILS FOUND IN RAW TEXT ===');
                        console.log('Count:', foundEmails ? foundEmails.length : 0);
                        if (foundEmails) {
                            console.log('Emails:', foundEmails);
                        }
                        chunkSize = 15000;
                        if (!(documentText.length <= chunkSize)) return [3 /*break*/, 2];
                        console.log('=== PROCESSING AS SINGLE CHUNK ===');
                        return [4 /*yield*/, this.processSingleChunk(documentText)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        // Otherwise, use chunked processing
                        console.log('=== PROCESSING WITH CHUNKED METHOD ===');
                        console.log('Document length:', documentText.length, 'characters');
                        console.log('Chunk size:', chunkSize, 'characters');
                        chunks = this.splitIntoChunks(documentText, chunkSize);
                        console.log('Number of chunks:', chunks.length);
                        return [4 /*yield*/, this.processChunks(chunks)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_1 = _a.sent();
                        console.error('Error extracting metadata:', error_1);
                        throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Build the prompt for metadata extraction
     */
    AzureOpenAIService.prototype.buildExtractionPrompt = function (documentText) {
        var buList = _ValidationConstants__WEBPACK_IMPORTED_MODULE_0__["ALLOWED_BUSINESS_UNITS"].join('\n- ');
        var deptList = _ValidationConstants__WEBPACK_IMPORTED_MODULE_0__["ALLOWED_DEPARTMENTS"].join('\n- ');
        var diseaseAreaList = _ValidationConstants__WEBPACK_IMPORTED_MODULE_0__["ALLOWED_DISEASE_AREAS"].join('\n- ');
        var therapyAreaList = _ValidationConstants__WEBPACK_IMPORTED_MODULE_0__["ALLOWED_THERAPY_AREAS"].join('\n- ');
        var documentTypeList = _ValidationConstants__WEBPACK_IMPORTED_MODULE_0__["ALLOWED_DOCUMENT_TYPES"].join('\n- ');
        return "You are an expert document analyzer. Analyze the following document and extract structured information. You MUST be thorough and accurate.\n\nCRITICAL EXTRACTION RULES:\n\n**MANDATORY FIELDS (MUST ALWAYS BE FILLED - NEVER LEAVE BLANK):**\n- title: MUST extract a title. If no explicit title exists, use the first heading, document name, or create a descriptive title based on the main topic\n- documentType: MUST identify the document type. Look at file format, content structure, or explicitly stated type. Common types: \"PPTX\", \"PDF\", \"Word Document\", \"Report\", \"Proposal\", \"Presentation\", \"White Paper\", \"Case Study\", \"Training Material\", etc.\n- bu (Business Unit): MUST find and match to one of the allowed values below. If not explicitly mentioned, infer from context (department names, project descriptions, team mentions, etc.)\n- department: MUST find and match to one of the allowed values below. If not explicitly mentioned, infer from context (team names, functional areas, work descriptions, etc.)\n- abstract: MUST create a brief summary (1-2 sentences) describing what the document is about, its purpose, or main content\n\n**CONDITIONAL FIELDS (ONLY FILL IF FOUND):**\n- region: ONLY if a geographic region is explicitly mentioned (e.g., \"North America\", \"Europe\", \"Asia\", \"APAC\", \"EMEA\", etc.)\n- client: ONLY if a COMPANY NAME or ORGANIZATION NAME is mentioned. This should be a business entity, not a person's name, department, or internal team. Look for company names, client organizations, customer names, partner companies. If you find a person's name but not a company, leave this empty.\n\n**COLLECTION FIELDS (EXTRACT ALL INSTANCES):**\n- emails: Extract EVERY email address found (even if 100+). Look carefully throughout the entire document.\n- phones: Extract EVERY phone number found (even if 100+). Include all formats.\n- ids: Extract all ID numbers, reference numbers, document IDs, case numbers, etc.\n- pricing: Extract all pricing, cost, financial, or monetary information\n\nFields to extract:\n\n1. title - **MANDATORY**: The document title, main heading, or document name. If no explicit title exists, create a descriptive title based on the main topic or first major heading. NEVER leave this empty.\n\n2. documentType - **MANDATORY**: Document Type. MUST be one of these exact values (match the closest one based on the document's content, structure, and context):\n- ".concat(documentTypeList, "\nCarefully read and understand the entire document. Analyze the content structure, format, purpose, and context. Look for explicit document type mentions, or infer from the document's structure (e.g., slides = \"Deck\", training content = \"Training\", FAQ format = \"Frequently Asked Questions (FAQs)\", etc.). Match to the closest value from the list above. This field MUST always be filled - if no exact match can be found, choose the most appropriate category from the list.\n\n3. bu - **MANDATORY**: Business Unit. MUST be one of these exact values (match the closest one, or infer from context):\n- ").concat(buList, "\nIf not explicitly mentioned, analyze the document content, department references, project descriptions, or team mentions to infer the most likely Business Unit. NEVER leave empty - always match to the closest value.\n\n4. department - **MANDATORY**: Department. MUST be one of these exact values (match the closest one, or infer from context):\n- ").concat(deptList, "\nIf not explicitly mentioned, analyze the document content, team names, functional areas, work descriptions, or project context to infer the most likely Department. NEVER leave empty - always match to the closest value.\n\n5. region - Geographic region mentioned (e.g., \"North America\", \"Europe\", \"Asia\", \"APAC\", \"EMEA\", \"Latin America\"). ONLY fill if explicitly mentioned in the document, otherwise use \"\"\n\n6. client - **COMPANY NAME ONLY**: Client name or organization. This field should ONLY contain company names, business entities, or organization names. Do NOT include:\n- Person names (unless it's clearly a company name like \"John's Consulting LLC\")\n- Internal departments or teams\n- Generic terms like \"the client\" or \"our customer\"\n- Project names that aren't company names\nLook for: company names, client organizations, customer companies, partner organizations, vendor names. If you find a person's name but no associated company, leave this empty. If you find \"the client\" or similar without a specific company name, leave empty.\n\n7. abstract - **MANDATORY**: A brief summary (1-2 sentences) describing what the document is about, its main purpose, key topics, or primary content. MUST provide a summary even if brief. NEVER leave empty.\n\n8. diseaseArea - Disease Area. MUST be one of these exact values (match the closest one based on the document content):\n- ").concat(diseaseAreaList, "\nCarefully read and understand the entire document. Look for mentions of diseases, medical conditions, health conditions, or therapeutic areas. Match to the closest value from the list above. If no disease area is mentioned or cannot be inferred, use empty string \"\".\n\n9. therapyArea - Therapy Area. MUST be one of these exact values (match the closest one based on the document content):\n- ").concat(therapyAreaList, "\nCarefully read and understand the entire document. Look for mentions of medical specialties, therapeutic approaches, treatment areas, or clinical domains. Match to the closest value from the list above. If no therapy area is mentioned or cannot be inferred, use empty string \"\".\n\n10. emails - **CRITICAL: Extract ALL email addresses found in the document.** Look for patterns like \"text@domain.com\" or \"name@company.org\". Extract EVERY single email address you can find, even if there are 20, 50, or 100+. Do NOT skip any emails. Scan the ENTIRE document carefully, including headers, footers, signatures, and body text. Separate multiple emails with commas. Format: \"email1@example.com, email2@example.com, email3@example.com, ...\" If you find even one email, include it. If you find none, use empty string \"\".\n\n11. phones - **CRITICAL: Extract ALL phone numbers found in the document.** Look for patterns like \"+1-555-123-4567\", \"(555) 123-4567\", \"555-123-4567\", \"555.123.4567\", \"+44 20 1234 5678\", etc. Extract EVERY single phone number you can find, even if there are many. Include all formats (with/without country codes, with/without dashes, with/without parentheses, international formats). Separate multiple phones with commas. Format: \"+1-555-123-4567, 555-987-6543, ...\" If you find even one phone, include it. If you find none, use empty string \"\".\n\n12. ids - Any ID numbers, reference numbers, document IDs, case numbers, ticket numbers, or identifiers found (comma-separated if multiple)\n\n13. pricing - Any pricing information, costs, financial terms, monetary values, budgets, or financial data mentioned\n\nDocument text:\n").concat(documentText, "\n\nReturn only valid JSON in this format (use empty string \"\" for fields not found):\n{\n  \"title\": \"...\",\n  \"documentType\": \"...\",\n  \"bu\": \"...\",\n  \"department\": \"...\",\n  \"region\": \"...\",\n  \"client\": \"...\",\n  \"abstract\": \"...\",\n  \"diseaseArea\": \"...\",\n  \"therapyArea\": \"...\",\n  \"emails\": \"...\",\n  \"phones\": \"...\",\n  \"ids\": \"...\",\n  \"pricing\": \"...\"\n}");
    };
    /**
     * Sanitize and validate extracted metadata
     */
    AzureOpenAIService.prototype.sanitizeMetadata = function (metadata) {
        var sanitized = {};
        // Ensure all fields are strings and trim whitespace
        var fields = [
            'title', 'documentType', 'bu', 'department', 'region', 'client',
            'abstract', 'diseaseArea', 'therapyArea', 'emails', 'phones',
            'ids', 'pricing'
        ];
        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
            var field = fields_1[_i];
            var value = metadata[field];
            sanitized[field] = typeof value === 'string' ? value.trim() : '';
        }
        // MANDATORY FIELDS - Ensure they are never empty
        // Title: If empty, use a default or file name
        if (!sanitized.title || sanitized.title === '') {
            sanitized.title = 'Untitled Document';
            console.warn('⚠️ Title was empty, using default');
        }
        // DocumentType: Must always have a value and match allowed list
        if (!sanitized.documentType || sanitized.documentType === '') {
            // Use "Others" as fallback since it's in the allowed list
            sanitized.documentType = 'Others';
            console.warn('⚠️ DocumentType was empty, using fallback: Others');
        }
        else {
            // Validate and match to allowed values
            var matchedDocType = Object(_ValidationConstants__WEBPACK_IMPORTED_MODULE_0__["findBestMatch"])(sanitized.documentType, _ValidationConstants__WEBPACK_IMPORTED_MODULE_0__["ALLOWED_DOCUMENT_TYPES"]);
            if (matchedDocType) {
                sanitized.documentType = matchedDocType;
            }
            else {
                // If no match found, use "Others" as fallback
                sanitized.documentType = 'Others';
                console.warn('⚠️ DocumentType did not match any allowed value:', sanitized.documentType, '- using fallback: Others');
            }
        }
        // Business Unit: Must always have a value - try to match or use first allowed value as fallback
        if (!sanitized.bu || sanitized.bu === '') {
            // Try to infer from other fields or use a default
            sanitized.bu = _ValidationConstants__WEBPACK_IMPORTED_MODULE_0__["ALLOWED_BUSINESS_UNITS"][0]; // Use first as fallback
            console.warn('⚠️ Business Unit was empty, using fallback:', sanitized.bu);
        }
        else {
            var matchedBU = Object(_ValidationConstants__WEBPACK_IMPORTED_MODULE_0__["findBestMatch"])(sanitized.bu, _ValidationConstants__WEBPACK_IMPORTED_MODULE_0__["ALLOWED_BUSINESS_UNITS"]);
            if (matchedBU) {
                sanitized.bu = matchedBU;
            }
            else {
                // If no match found, use first allowed value
                sanitized.bu = _ValidationConstants__WEBPACK_IMPORTED_MODULE_0__["ALLOWED_BUSINESS_UNITS"][0];
                console.warn('⚠️ Business Unit did not match any allowed value, using fallback');
            }
        }
        // Department: Must always have a value - try to match or use first allowed value as fallback
        if (!sanitized.department || sanitized.department === '') {
            sanitized.department = _ValidationConstants__WEBPACK_IMPORTED_MODULE_0__["ALLOWED_DEPARTMENTS"][0]; // Use first as fallback
            console.warn('⚠️ Department was empty, using fallback:', sanitized.department);
        }
        else {
            var matchedDept = Object(_ValidationConstants__WEBPACK_IMPORTED_MODULE_0__["findBestMatch"])(sanitized.department, _ValidationConstants__WEBPACK_IMPORTED_MODULE_0__["ALLOWED_DEPARTMENTS"]);
            if (matchedDept) {
                sanitized.department = matchedDept;
            }
            else {
                // If no match found, use first allowed value
                sanitized.department = _ValidationConstants__WEBPACK_IMPORTED_MODULE_0__["ALLOWED_DEPARTMENTS"][0];
                console.warn('⚠️ Department did not match any allowed value, using fallback');
            }
        }
        // Abstract: Must always have a value
        if (!sanitized.abstract || sanitized.abstract === '') {
            sanitized.abstract = 'Document content summary not available.';
            console.warn('⚠️ Abstract was empty, using default');
        }
        // Ensure region is empty if not found (not just whitespace)
        if (sanitized.region && (sanitized.region.toLowerCase() === 'not found' ||
            sanitized.region.toLowerCase() === 'n/a' ||
            sanitized.region.toLowerCase() === 'none' ||
            sanitized.region.toLowerCase() === 'unknown')) {
            sanitized.region = '';
        }
        // Disease Area: Validate and match to allowed values
        if (sanitized.diseaseArea) {
            var matchedDiseaseArea = Object(_ValidationConstants__WEBPACK_IMPORTED_MODULE_0__["findBestMatch"])(sanitized.diseaseArea, _ValidationConstants__WEBPACK_IMPORTED_MODULE_0__["ALLOWED_DISEASE_AREAS"]);
            sanitized.diseaseArea = matchedDiseaseArea;
            if (!matchedDiseaseArea) {
                console.warn('⚠️ Disease Area did not match any allowed value:', sanitized.diseaseArea);
            }
        }
        // Therapy Area: Validate and match to allowed values
        if (sanitized.therapyArea) {
            var matchedTherapyArea = Object(_ValidationConstants__WEBPACK_IMPORTED_MODULE_0__["findBestMatch"])(sanitized.therapyArea, _ValidationConstants__WEBPACK_IMPORTED_MODULE_0__["ALLOWED_THERAPY_AREAS"]);
            sanitized.therapyArea = matchedTherapyArea;
            if (!matchedTherapyArea) {
                console.warn('⚠️ Therapy Area did not match any allowed value:', sanitized.therapyArea);
            }
        }
        // Client field validation - should only contain company names
        // Remove if it contains person names, generic terms, or invalid content
        if (sanitized.client) {
            var clientLower_1 = sanitized.client.toLowerCase();
            // Remove invalid values
            if (clientLower_1 === 'not found' ||
                clientLower_1 === 'n/a' ||
                clientLower_1 === 'none' ||
                clientLower_1 === 'unknown' ||
                clientLower_1 === 'the client' ||
                clientLower_1 === 'our client' ||
                clientLower_1 === 'client' ||
                clientLower_1.indexOf('internal') !== -1 ||
                clientLower_1.indexOf('team') !== -1) {
                sanitized.client = '';
                console.log('⚠️ Client field contained invalid value, cleared');
            }
            else {
                // Check if it looks like a person's name (first name + last name pattern without company indicators)
                // Company indicators: Inc, LLC, Corp, Ltd, Company, Co, etc.
                var companyIndicators = ['inc', 'llc', 'corp', 'ltd', 'company', 'co', 'group', 'enterprises', 'solutions', 'systems', 'technologies', 'consulting', 'services'];
                var hasCompanyIndicator = companyIndicators.some(function (indicator) { return clientLower_1.indexOf(indicator) !== -1; });
                // If it's just a name without company indicators and doesn't look like a company, clear it
                if (!hasCompanyIndicator && sanitized.client.split(' ').length <= 3) {
                    // Might be a person's name - check if it's clearly a company by other means
                    // If it's just 1-2 words without company indicators, it's likely a person's name
                    var words = sanitized.client.trim().split(/\s+/);
                    if (words.length <= 2 && !hasCompanyIndicator) {
                        sanitized.client = '';
                        console.log('⚠️ Client field appears to be a person name, not a company, cleared');
                    }
                }
            }
        }
        // Mask emails and phones
        console.log('=== BEFORE MASKING ===');
        console.log('Raw emails:', sanitized.emails);
        console.log('Raw phones:', sanitized.phones);
        if (sanitized.emails) {
            sanitized.emails = Object(_DataMasking__WEBPACK_IMPORTED_MODULE_1__["maskAllEmails"])(sanitized.emails);
        }
        else {
            console.log('⚠️ No emails field in extracted metadata!');
        }
        if (sanitized.phones) {
            sanitized.phones = Object(_DataMasking__WEBPACK_IMPORTED_MODULE_1__["maskAllPhones"])(sanitized.phones);
        }
        else {
            console.log('⚠️ No phones field in extracted metadata!');
        }
        return sanitized;
    };
    /**
     * Split document text into chunks of specified size
     */
    AzureOpenAIService.prototype.splitIntoChunks = function (text, chunkSize) {
        var chunks = [];
        var start = 0;
        while (start < text.length) {
            var end = start + chunkSize;
            // If not the last chunk, try to break at a word boundary
            if (end < text.length) {
                // Look for a good break point (newline, period, space)
                var breakPoint = Math.max(text.lastIndexOf('\n\n', end), text.lastIndexOf('\n', end), text.lastIndexOf('. ', end), text.lastIndexOf(' ', end));
                if (breakPoint > start + chunkSize * 0.8) {
                    // Only use break point if it's not too early (at least 80% of chunk size)
                    end = breakPoint + 1;
                }
            }
            chunks.push(text.substring(start, end));
            start = end;
        }
        return chunks;
    };
    /**
     * Process a single chunk of text
     */
    AzureOpenAIService.prototype.processSingleChunk = function (chunkText) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var prompt, response, errorText, errorMessage, errorJson, data, content, jsonMatch, jsonText, extracted, sanitized;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        console.log('=== PROCESSING SINGLE CHUNK ===');
                        console.log('Chunk length:', chunkText.length, 'characters');
                        prompt = this.buildExtractionPrompt(chunkText);
                        return [4 /*yield*/, fetch("".concat(this.config.endpoint, "/openai/deployments/").concat(this.config.deploymentName, "/chat/completions?api-version=").concat(this.config.apiVersion), {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'api-key': this.config.apiKey
                                },
                                body: JSON.stringify({
                                    messages: [
                                        {
                                            role: 'system',
                                            content: 'You are an expert document analyzer. Extract structured information from documents and return it as valid JSON only, without any markdown formatting or code blocks.'
                                        },
                                        {
                                            role: 'user',
                                            content: prompt
                                        }
                                    ],
                                    temperature: 0.8,
                                    max_tokens: 2000
                                })
                            })];
                    case 1:
                        response = _e.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.text()];
                    case 2:
                        errorText = _e.sent();
                        errorMessage = "Azure OpenAI API error: ".concat(response.status);
                        // Handle CORS errors
                        if (response.status === 0 || response.statusText === '') {
                            errorMessage = 'CORS error: Unable to connect to Azure OpenAI. The API may need CORS configuration or a backend proxy.';
                        }
                        else {
                            try {
                                errorJson = JSON.parse(errorText);
                                errorMessage = ((_a = errorJson.error) === null || _a === void 0 ? void 0 : _a.message) || errorText || errorMessage;
                            }
                            catch (_f) {
                                errorMessage = errorText || errorMessage;
                            }
                        }
                        throw new Error(errorMessage);
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        data = _e.sent();
                        content = (_d = (_c = (_b = data.choices) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.message) === null || _d === void 0 ? void 0 : _d.content;
                        if (!content) {
                            throw new Error('No content returned from Azure OpenAI');
                        }
                        console.log('=== AI RESPONSE (RAW) ===');
                        console.log(content);
                        jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, content];
                        jsonText = jsonMatch[1] || content;
                        console.log('=== PARSED JSON ===');
                        console.log(jsonText);
                        extracted = JSON.parse(jsonText.trim());
                        console.log('=== EXTRACTED METADATA (BEFORE SANITIZATION) ===');
                        console.log(JSON.stringify(extracted, null, 2));
                        console.log('Emails extracted:', extracted.emails);
                        console.log('Phones extracted:', extracted.phones);
                        sanitized = this.sanitizeMetadata(extracted);
                        console.log('=== FINAL METADATA (AFTER SANITIZATION) ===');
                        console.log(JSON.stringify(sanitized, null, 2));
                        console.log('Emails (masked):', sanitized.emails);
                        console.log('Phones (masked):', sanitized.phones);
                        return [2 /*return*/, sanitized];
                }
            });
        });
    };
    /**
     * Process multiple chunks and merge results
     */
    AzureOpenAIService.prototype.processChunks = function (chunks) {
        return __awaiter(this, void 0, void 0, function () {
            var chunkResults, i, result, error_2, merged, finalResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('=== PROCESSING', chunks.length, 'CHUNKS ===');
                        chunkResults = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < chunks.length)) return [3 /*break*/, 6];
                        console.log("\n=== PROCESSING CHUNK ".concat(i + 1, "/").concat(chunks.length, " ==="));
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.processSingleChunk(chunks[i])];
                    case 3:
                        result = _a.sent();
                        chunkResults.push(result);
                        console.log("\u2713 Chunk ".concat(i + 1, " processed successfully"));
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        console.error("\u2717 Error processing chunk ".concat(i + 1, ":"), error_2);
                        // Continue with other chunks even if one fails
                        chunkResults.push({});
                        return [3 /*break*/, 5];
                    case 5:
                        i++;
                        return [3 /*break*/, 1];
                    case 6:
                        console.log('\n=== MERGING CHUNK RESULTS ===');
                        merged = this.mergeChunkResults(chunkResults);
                        console.log('=== MERGED RESULT (BEFORE FINAL SANITIZATION) ===');
                        console.log(JSON.stringify(merged, null, 2));
                        finalResult = this.sanitizeMetadata(merged);
                        console.log('=== FINAL MERGED RESULT ===');
                        console.log(JSON.stringify(finalResult, null, 2));
                        return [2 /*return*/, finalResult];
                }
            });
        });
    };
    /**
     * Merge results from multiple chunks intelligently
     */
    AzureOpenAIService.prototype.mergeChunkResults = function (results) {
        var _a;
        var merged = {
            title: '',
            documentType: '',
            bu: '',
            department: '',
            region: '',
            client: '',
            abstract: '',
            emails: '',
            phones: '',
            ids: '',
            pricing: ''
        };
        // Collect all emails and phones (combine from all chunks)
        var allEmails = [];
        var allPhones = [];
        var allIds = [];
        var allPricing = [];
        for (var i = 0; i < results.length; i++) {
            var result = results[i];
            // Title: Take from first chunk (most likely to be at the start)
            if (!merged.title && result.title) {
                merged.title = result.title;
            }
            // DocumentType: Take from first chunk
            if (!merged.documentType && result.documentType) {
                merged.documentType = result.documentType;
            }
            // BU: Take first non-empty match
            if (!merged.bu && result.bu) {
                merged.bu = result.bu;
            }
            // Department: Take first non-empty match
            if (!merged.department && result.department) {
                merged.department = result.department;
            }
            // Region: Take first non-empty match
            if (!merged.region && result.region) {
                merged.region = result.region;
            }
            // Client: Take first non-empty match
            if (!merged.client && result.client) {
                merged.client = result.client;
            }
            // Abstract: Take the longest one (most comprehensive)
            if (result.abstract && result.abstract.length > (((_a = merged.abstract) === null || _a === void 0 ? void 0 : _a.length) || 0)) {
                merged.abstract = result.abstract;
            }
            // Emails: Collect all unique emails
            if (result.emails) {
                var emails = result.emails.split(/[,;\n]/).map(function (e) { return e.trim(); }).filter(function (e) { return e.length > 0; });
                for (var j = 0; j < emails.length; j++) {
                    var email = emails[j];
                    // Add if not already in the list (case-insensitive)
                    if (email && allEmails.indexOf(email.toLowerCase()) === -1) {
                        allEmails.push(email.toLowerCase());
                        // Keep original case from first occurrence
                        var originalEmail = emails[j];
                        if (allEmails.indexOf(originalEmail.toLowerCase()) === -1) {
                            allEmails[allEmails.length - 1] = originalEmail;
                        }
                    }
                }
            }
            // Phones: Collect all unique phones
            if (result.phones) {
                var phones = result.phones.split(/[,;\n]/).map(function (p) { return p.trim(); }).filter(function (p) { return p.length > 0; });
                for (var j = 0; j < phones.length; j++) {
                    var phone = phones[j];
                    // Add if not already in the list
                    if (phone && allPhones.indexOf(phone) === -1) {
                        allPhones.push(phone);
                    }
                }
            }
            // IDs: Collect all
            if (result.ids) {
                var ids = result.ids.split(/[,;\n]/).map(function (id) { return id.trim(); }).filter(function (id) { return id.length > 0; });
                for (var j = 0; j < ids.length; j++) {
                    var id = ids[j];
                    if (id && allIds.indexOf(id) === -1) {
                        allIds.push(id);
                    }
                }
            }
            // Pricing: Collect all (combine with newlines)
            if (result.pricing) {
                allPricing.push(result.pricing);
            }
        }
        // Join collected values
        merged.emails = allEmails.join(', ');
        merged.phones = allPhones.join(', ');
        merged.ids = allIds.join(', ');
        merged.pricing = allPricing.join('\n\n');
        console.log('Merged emails count:', allEmails.length);
        console.log('Merged phones count:', allPhones.length);
        console.log('Merged IDs count:', allIds.length);
        return merged;
    };
    return AzureOpenAIService;
}());



/***/ }),

/***/ "e9LQ":
/*!***********************************************************************!*\
  !*** ./lib/webparts/migration/pages/QuickLinksPage/QuickLinksPage.js ***!
  \***********************************************************************/
/*! exports provided: QuickLinksPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuickLinksPage", function() { return QuickLinksPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _QuickLinksPage_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QuickLinksPage.module.scss */ "xgt8");


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
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _QuickLinksPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].quickLinksPage },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _QuickLinksPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].pageContainer },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _QuickLinksPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].quickLinksSidebar },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h2", { className: _QuickLinksPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].sidebarTitle }, "Quick Links"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { className: _QuickLinksPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].linksList }, quickLinks.map(function (link, index) { return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { key: index },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { href: "#", onClick: function (e) { return handleLinkClick(link, e); }, className: _QuickLinksPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].linkItem },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: _QuickLinksPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].linkArrow }, ">"),
                        link))); }))))));
};


/***/ }),

/***/ "excW":
/*!******************************************************************************!*\
  !*** ./lib/webparts/migration/components/ContentArea/ContentArea.module.css ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!../../../../../node_modules/postcss-loader/src??postcss!./ContentArea.module.css */ "W28U");
var loader = __webpack_require__(/*! ./node_modules/@microsoft/loader-load-themed-styles/node_modules/@microsoft/load-themed-styles/lib/index.js */ "ruv1");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "faye":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_faye__;

/***/ }),

/***/ "g8ea":
/*!************************************************************************************!*\
  !*** ./lib/webparts/migration/components/BUDetailPage/BUDetailPage.module.scss.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./BUDetailPage.module.css */ "RxoZ");
var styles = {
    buDetailPage: 'buDetailPage_291ec8d4'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "glSY":
/*!************************************************************************!*\
  !*** ./lib/webparts/migration/components/Footer/Footer.module.scss.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./Footer.module.css */ "AP5B");
var styles = {
    footer: 'footer_49b3a56d',
    footerContainer: 'footerContainer_49b3a56d',
    logoContainer: 'logoContainer_49b3a56d',
    logoSquare: 'logoSquare_49b3a56d',
    logoText: 'logoText_49b3a56d'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "hczH":
/*!*************************************************************************!*\
  !*** ./lib/webparts/migration/pages/WhosWhoPage/WhosWhoPage.module.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!../../../../../node_modules/postcss-loader/src??postcss!./WhosWhoPage.module.css */ "NrAi");
var loader = __webpack_require__(/*! ./node_modules/@microsoft/loader-load-themed-styles/node_modules/@microsoft/load-themed-styles/lib/index.js */ "ruv1");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "hx5O":
/*!****************************************************************!*\
  !*** ./lib/webparts/migration/components/BUHeader/BUHeader.js ***!
  \****************************************************************/
/*! exports provided: BUHeader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BUHeader", function() { return BUHeader; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BUHeader_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BUHeader.module.scss */ "N9u2");


var BUHeader = function (props) {
    var handleBack = function () {
        if (props.onBack) {
            props.onBack();
        }
    };
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _BUHeader_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].buHeader },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _BUHeader_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].headerContent },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _BUHeader_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].leftSection },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: _BUHeader_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].backButton, onClick: handleBack },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", { className: _BUHeader_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].backArrow, width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", { d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z", fill: "white" }))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", { className: _BUHeader_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].buName }, props.buName),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { className: _BUHeader_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].description }, "About the business unit, the services they provide...etc"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: _BUHeader_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].addFileButton }, "Add a file")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _BUHeader_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].rightSection },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _BUHeader_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].buHead }, "BU Head"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _BUHeader_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].searchContainer },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", { className: _BUHeader_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].searchIcon, width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", { d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z", fill: "#666" })),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { type: "text", className: _BUHeader_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].searchInput, placeholder: "Search..." }))))));
};


/***/ }),

/***/ "iRJX":
/*!****************************************************************!*\
  !*** ./lib/webparts/migration/components/Migration.module.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!../../../../node_modules/postcss-loader/src??postcss!./Migration.module.css */ "XZl5");
var loader = __webpack_require__(/*! ./node_modules/@microsoft/loader-load-themed-styles/node_modules/@microsoft/load-themed-styles/lib/index.js */ "ruv1");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "iv02":
/*!********************************************************!*\
  !*** ./lib/webparts/migration/components/Migration.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Header_Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Header/Header */ "khdz");
/* harmony import */ var _Navigation_Navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Navigation/Navigation */ "9aec");
/* harmony import */ var _QuestionSection_QuestionSection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./QuestionSection/QuestionSection */ "XWkb");
/* harmony import */ var _Footer_Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Footer/Footer */ "ZWc6");
/* harmony import */ var _ContentArea_ContentArea__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ContentArea/ContentArea */ "aC/Q");
/* harmony import */ var _BUDetailPage_BUDetailPage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./BUDetailPage/BUDetailPage */ "KKW/");
/* harmony import */ var _Migration_module_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Migration.module.scss */ "FfgT");
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
            return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _Migration_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].migration },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_BUDetailPage_BUDetailPage__WEBPACK_IMPORTED_MODULE_6__["BUDetailPage"], { buName: this.state.selectedBU, context: this.props.context, onBack: this.handleBackToMain })));
        }
        // Otherwise show main page
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _Migration_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].migration },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Header_Header__WEBPACK_IMPORTED_MODULE_1__["Header"], { context: this.props.context }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Navigation_Navigation__WEBPACK_IMPORTED_MODULE_2__["Navigation"], { activePage: this.state.activePage, onNavClick: this.handleNavClick }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_ContentArea_ContentArea__WEBPACK_IMPORTED_MODULE_5__["ContentArea"], { activePage: this.state.activePage, context: this.props.context, onBUClick: this.handleBUClick }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_QuestionSection_QuestionSection__WEBPACK_IMPORTED_MODULE_3__["QuestionSection"], null),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Footer_Footer__WEBPACK_IMPORTED_MODULE_4__["Footer"], null)));
    };
    return Migration;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (Migration);


/***/ }),

/***/ "jdzR":
/*!************************************************************************!*\
  !*** ./lib/webparts/migration/components/BUHeader/BUHeader.module.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!../../../../../node_modules/postcss-loader/src??postcss!./BUHeader.module.css */ "wSXW");
var loader = __webpack_require__(/*! ./node_modules/@microsoft/loader-load-themed-styles/node_modules/@microsoft/load-themed-styles/lib/index.js */ "ruv1");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "khdz":
/*!************************************************************!*\
  !*** ./lib/webparts/migration/components/Header/Header.js ***!
  \************************************************************/
/*! exports provided: Header */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Header", function() { return Header; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Header_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Header.module.scss */ "D8py");
/* harmony import */ var _FileUpload_FileUpload__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../FileUpload/FileUpload */ "pNkB");




var Header = function (props) {
    var _a = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false), showUploader = _a[0], setShowUploader = _a[1];
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _Header_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].header },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _Header_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].headerContent },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _Header_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].leftSection },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", { className: _Header_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].companyName }, "Indegene"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { className: _Header_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].description }, "About Indegene, the services they provide...etc"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: _Header_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].addFileButton, onClick: function () { return setShowUploader(true); } }, "Add a file")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _Header_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].rightSection },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _Header_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].leadership }, "Leadership"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _Header_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].searchContainer },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", { className: _Header_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].searchIcon, width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", { d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z", fill: "#666" })),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { type: "text", className: _Header_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].searchInput, placeholder: "Search..." })))),
        showUploader && (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_FileUpload_FileUpload__WEBPACK_IMPORTED_MODULE_2__["FileUpload"], { onClose: function () { return setShowUploader(false); }, context: props.context }))));
};


/***/ }),

/***/ "lGgc":
/*!******************************************************************************************!*\
  !*** ./lib/webparts/migration/components/BUQuestionSection/BUQuestionSection.module.css ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!../../../../../node_modules/postcss-loader/src??postcss!./BUQuestionSection.module.css */ "Gqvk");
var loader = __webpack_require__(/*! ./node_modules/@microsoft/loader-load-themed-styles/node_modules/@microsoft/load-themed-styles/lib/index.js */ "ruv1");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "mYfb":
/*!***********************************************************!*\
  !*** ./lib/webparts/migration/services/DocumentParser.js ***!
  \***********************************************************/
/*! exports provided: DocumentParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentParser", function() { return DocumentParser; });
/**
 * Service to extract text from various document formats
 */
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
var DocumentParser = /** @class */ (function () {
    function DocumentParser() {
    }
    /**
     * Extract text from a file based on its type
     */
    DocumentParser.parseFile = function (file) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var fileExtension, _b, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        fileExtension = ((_a = file.name.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '';
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 11, , 12]);
                        _b = fileExtension;
                        switch (_b) {
                            case 'pdf': return [3 /*break*/, 2];
                            case 'docx': return [3 /*break*/, 3];
                            case 'doc': return [3 /*break*/, 5];
                            case 'pptx': return [3 /*break*/, 6];
                            case 'ppt': return [3 /*break*/, 6];
                            case 'xlsx': return [3 /*break*/, 7];
                            case 'xls': return [3 /*break*/, 7];
                            case 'mpp': return [3 /*break*/, 8];
                        }
                        return [3 /*break*/, 9];
                    case 2: 
                    // return await this.parsePDF(file);
                    return [2 /*return*/, { text: '', success: false, error: 'PDF parsing is currently disabled. Please convert to Word format.' }];
                    case 3: return [4 /*yield*/, this.parseWord(file)];
                    case 4: return [2 /*return*/, _c.sent()];
                    case 5: return [2 /*return*/, { text: '', success: false, error: 'Legacy .doc format not supported. Please convert to .docx' }];
                    case 6: return [2 /*return*/, { text: '', success: false, error: 'PowerPoint parsing not yet implemented. Please convert to PDF or Word format.' }];
                    case 7: return [2 /*return*/, { text: '', success: false, error: 'Excel parsing not yet implemented. Please convert to PDF or Word format.' }];
                    case 8: return [2 /*return*/, { text: '', success: false, error: 'MS Project parsing not yet implemented. Please convert to PDF or Word format.' }];
                    case 9: return [2 /*return*/, { text: '', success: false, error: "Unsupported file type: ".concat(fileExtension) }];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        error_1 = _c.sent();
                        return [2 /*return*/, {
                                text: '',
                                success: false,
                                error: error_1 instanceof Error ? error_1.message : 'Unknown error occurred while parsing document'
                            }];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Extract text from PDF file
     * DISABLED: PDF parsing is currently disabled due to missing pdfjs-dist dependency
     */
    /* private static async parsePDF(file: File): Promise<DocumentParseResult> {
      try {
        console.log('=== STARTING PDF PARSING ===');
        console.log('File name:', file.name);
        console.log('File size:', file.size, 'bytes');
        
        // Import PDF.js
        const pdfjsLib = await import('pdfjs-dist');
        console.log('PDF.js library loaded, version:', pdfjsLib.version);
        
        // For SharePoint Framework with strict CSP, we need to work around restrictions
        // Webpack bundles the worker as a chunk file that we can reference
        // The CSP is in "report-only" mode, so violations are logged but execution continues
        if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
          try {
            // Find the base path where the webpart bundle is loaded from
            const scripts = document.getElementsByTagName('script');
            let basePath = '';
            for (let i = 0; i < scripts.length; i++) {
              const src = scripts[i].src;
              if (src && src.indexOf('migration-web-part') !== -1) {
                basePath = src.substring(0, src.lastIndexOf('/'));
                break;
              }
            }
            
            if (basePath) {
              // Webpack bundles the worker as: chunk.vendors-node_modules_pdfjs-dist_build_pdf_worker_min_mjs.js
              const workerPath = basePath + '/chunk.vendors-node_modules_pdfjs-dist_build_pdf_worker_min_mjs.js';
              pdfjsLib.GlobalWorkerOptions.workerSrc = workerPath;
              console.log('PDF.js worker path set to bundled chunk:', workerPath);
            } else {
              // Fallback: Try relative path
              pdfjsLib.GlobalWorkerOptions.workerSrc = './chunk.vendors-node_modules_pdfjs-dist_build_pdf_worker_min_mjs.js';
              console.log('PDF.js worker path set to relative path (fallback)');
            }
          } catch (pathError) {
            console.warn('Could not set worker path, using data URL fallback:', pathError);
            // Fallback: Use data URL - CSP is report-only so execution will continue despite warning
            const minimalWorker = 'self.onmessage=function(e){self.postMessage(e.data)}';
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'data:application/javascript;base64,' + btoa(minimalWorker);
            console.log('PDF.js worker set to data URL (CSP warning expected, report-only mode allows execution)');
          }
        }
        
        console.log('Reading file as ArrayBuffer...');
        const arrayBuffer = await file.arrayBuffer();
        console.log('ArrayBuffer size:', arrayBuffer.byteLength, 'bytes');
        
        console.log('Loading PDF document...');
        // Disable worker explicitly to avoid CSP issues in SharePoint
        const pdf = await pdfjsLib.getDocument({
          // pdfjs expects a typed array (e.g. Uint8Array) rather than a raw ArrayBuffer
          data: new Uint8Array(arrayBuffer),
          verbosity: 0, // Reduce console noise
          useWorkerFetch: false,
          isEvalSupported: false,
          useSystemFonts: true
        }).promise;
        
        console.log('PDF loaded successfully. Number of pages:', pdf.numPages);
        
        let fullText = '';
        const numPages = pdf.numPages;
        
        // Extract text from each page
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
          console.log(`Extracting text from page ${pageNum}/${numPages}...`);
          try {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
              .map((item) => {
                // Handle both TextItem and TextMarkedContent types
                if ('str' in item && item.str) {
                  return item.str;
                }
                return '';
              })
              .join(' ');
            fullText += pageText + '\n';
            console.log(`Page ${pageNum} extracted: ${pageText.length} characters`);
          } catch (pageError) {
            console.error(`Error extracting page ${pageNum}:`, pageError);
            // Continue with other pages even if one fails
          }
        }
        
        const extractedText = fullText.trim();
        console.log('=== PDF PARSING COMPLETE ===');
        console.log('Total text extracted:', extractedText.length, 'characters');
        
        if (extractedText.length === 0) {
          console.warn('⚠️ WARNING: No text extracted from PDF. The PDF might be image-based or encrypted.');
          return {
            text: '',
            success: false,
            error: 'No text content found in PDF. The PDF might be image-based (scanned) or encrypted. Please use a text-based PDF or convert the document to Word format.'
          };
        }
        
        return {
          text: extractedText,
          success: true
        };
      } catch (error) {
        console.error('=== PDF PARSING ERROR ===');
        console.error('Error details:', error);
        console.error('Error type:', typeof error);
        console.error('Error message:', error instanceof Error ? error.message : String(error));
        
        let errorMessage = 'Failed to parse PDF';
        if (error instanceof Error) {
          errorMessage = error.message;
          
          // Provide more helpful error messages (using indexOf for ES5 compatibility)
          const msg = error.message.toLowerCase();
          if (msg.indexOf('worker') !== -1) {
            errorMessage = 'PDF.js worker failed to load. Please check your internet connection and try again.';
          } else if (msg.indexOf('invalid pdf') !== -1 || msg.indexOf('corrupted') !== -1) {
            errorMessage = 'The PDF file appears to be corrupted or invalid. Please try a different PDF file.';
          } else if (msg.indexOf('password') !== -1 || msg.indexOf('encrypted') !== -1) {
            errorMessage = 'The PDF is password-protected or encrypted. Please remove the password and try again.';
          }
        }
        
        return {
          text: '',
          success: false,
          error: errorMessage
        };
      }
    } */
    /**
     * Extract text from Word (.docx) file
     */
    DocumentParser.parseWord = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var mammoth, arrayBuffer, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.t.bind(null, /*! mammoth */ "w0O3", 7))];
                    case 1:
                        mammoth = _a.sent();
                        return [4 /*yield*/, file.arrayBuffer()];
                    case 2:
                        arrayBuffer = _a.sent();
                        return [4 /*yield*/, mammoth.extractRawText({ arrayBuffer: arrayBuffer })];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, {
                                text: result.value.trim(),
                                success: true
                            }];
                    case 4:
                        error_2 = _a.sent();
                        return [2 /*return*/, {
                                text: '',
                                success: false,
                                error: error_2 instanceof Error ? error_2.message : 'Failed to parse Word document'
                            }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return DocumentParser;
}());



/***/ }),

/***/ "nzr9":
/*!**********************************************************************************!*\
  !*** ./lib/webparts/migration/components/BUQuestionSection/BUQuestionSection.js ***!
  \**********************************************************************************/
/*! exports provided: BUQuestionSection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BUQuestionSection", function() { return BUQuestionSection; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BUQuestionSection_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BUQuestionSection.module.scss */ "FCkr");


var BUQuestionSection = function (props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _BUQuestionSection_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].questionSection },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _BUQuestionSection_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].questionContainer },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _BUQuestionSection_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].leftPrompt },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { className: _BUQuestionSection_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].promptText }, "Ask your question here")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _BUQuestionSection_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].rightInput },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { type: "text", className: _BUQuestionSection_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].questionInput, placeholder: "Type your question..." })))));
};


/***/ }),

/***/ "oAj4":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??postcss!./lib/webparts/migration/components/BUDetailPage/BUDetailPage.module.css ***!
  \***********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/runtime/api.js */ "Z+AG")(false);
// Module
exports.push([module.i, ".buDetailPage_291ec8d4{width:100%;min-height:100vh;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;margin:0;padding:0;font-family:Inter,sans-serif}", ""]);


/***/ }),

/***/ "pNkB":
/*!********************************************************************!*\
  !*** ./lib/webparts/migration/components/FileUpload/FileUpload.js ***!
  \********************************************************************/
/*! exports provided: FileUpload, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileUpload", function() { return FileUpload; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-http */ "vlQI");
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FileUpload.module.scss */ "OWAP");
/* harmony import */ var _MetadataForm_MetadataForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../MetadataForm/MetadataForm */ "Z90R");
/* harmony import */ var _services_DocumentParser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/DocumentParser */ "mYfb");
/* harmony import */ var _services_AzureOpenAIService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/AzureOpenAIService */ "dduH");
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






// Azure OpenAI Configuration
// NOTE: In production, API keys should be stored securely (e.g., Azure Key Vault, environment variables, or backend proxy)
// Exposing API keys in client-side code is a security risk. Consider using a backend API proxy.
var AZURE_OPENAI_CONFIG = {
    apiKey: '2Hcf7EkLSg88ySVEjrapikrQjIFA4F4BGgshU8Gwci15RkklqgGDJQQJ99BIACYeBjFXJ3w3AAABACOGHLjU',
    endpoint: 'https://engineeringteamopenai.openai.azure.com',
    deploymentName: 'gpt-4o'
};
var FileUpload = function (props) {
    var _a = react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), dragOver = _a[0], setDragOver = _a[1];
    var _b = react__WEBPACK_IMPORTED_MODULE_0__["useState"](null), uploadedFile = _b[0], setUploadedFile = _b[1];
    var _c = react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), isProcessing = _c[0], setIsProcessing = _c[1];
    var _d = react__WEBPACK_IMPORTED_MODULE_0__["useState"](null), extractedMetadata = _d[0], setExtractedMetadata = _d[1];
    var _e = react__WEBPACK_IMPORTED_MODULE_0__["useState"](null), processingError = _e[0], setProcessingError = _e[1];
    var _f = react__WEBPACK_IMPORTED_MODULE_0__["useState"](null), kmItemId = _f[0], setKmItemId = _f[1];
    var _g = react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), showForm = _g[0], setShowForm = _g[1];
    var _h = react__WEBPACK_IMPORTED_MODULE_0__["useState"](null), kmFileUrl = _h[0], setKmFileUrl = _h[1];
    var _j = react__WEBPACK_IMPORTED_MODULE_0__["useState"](null), successMessage = _j[0], setSuccessMessage = _j[1];
    var fileInputRef = react__WEBPACK_IMPORTED_MODULE_0__["useRef"](null);
    var openAIService = react__WEBPACK_IMPORTED_MODULE_0__["useRef"](new _services_AzureOpenAIService__WEBPACK_IMPORTED_MODULE_5__["AzureOpenAIService"](AZURE_OPENAI_CONFIG));
    var onBrowse = function () {
        var _a;
        (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click();
    };
    var onFileSelected = function (f) { return __awaiter(void 0, void 0, void 0, function () {
        var file, itemId, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    file = f && f.length ? f[0] : undefined;
                    if (!file) return [3 /*break*/, 7];
                    setUploadedFile(file);
                    setShowForm(false); // ⛔ hide form initially
                    setIsProcessing(true); // ⏳ immediately show analyzing UI
                    setProcessingError(null);
                    setExtractedMetadata(null);
                    // Create log + KMArtifacts + run AI
                    return [4 /*yield*/, createAuditLogItem(file)];
                case 1:
                    // Create log + KMArtifacts + run AI
                    _a.sent();
                    itemId = null;
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, updateKMArtifactsMetadata(file)];
                case 3:
                    itemId = _a.sent();
                    setKmItemId(itemId); // only set if success
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    console.error("KMArtifacts ERROR:", err_1);
                    setIsProcessing(false);
                    setProcessingError("KMArtifacts item could not be created.");
                    return [2 /*return*/]; // STOP the flow
                case 5: return [4 /*yield*/, processFileWithAI(file)];
                case 6:
                    _a.sent();
                    // ONLY SHOW FORM AFTER AI FINISHES
                    setShowForm(true);
                    _a.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    }); };
    var processFileWithAI = function (file) { return __awaiter(void 0, void 0, void 0, function () {
        var parseResult, errorMsg, errorMsg, metadata, error_1, errorMsg;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('=== STARTING FILE PROCESSING ===');
                    console.log('File:', file.name);
                    console.log('File type:', file.type);
                    console.log('File size:', file.size, 'bytes');
                    setIsProcessing(true);
                    setProcessingError(null);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, 5, 6]);
                    // Step 1: Parse the document to extract text
                    console.log('Step 1: Parsing document...');
                    return [4 /*yield*/, _services_DocumentParser__WEBPACK_IMPORTED_MODULE_4__["DocumentParser"].parseFile(file)];
                case 2:
                    parseResult = _b.sent();
                    console.log('Parse result:', {
                        success: parseResult.success,
                        textLength: ((_a = parseResult.text) === null || _a === void 0 ? void 0 : _a.length) || 0,
                        error: parseResult.error
                    });
                    if (!parseResult.success) {
                        errorMsg = parseResult.error || 'Failed to parse document';
                        console.error('Document parsing failed:', errorMsg);
                        setProcessingError(errorMsg);
                        setIsProcessing(false);
                        return [2 /*return*/];
                    }
                    if (!parseResult.text || parseResult.text.trim().length === 0) {
                        errorMsg = 'No text content found in the document. The document might be image-based or empty.';
                        console.error('No text extracted:', errorMsg);
                        setProcessingError(errorMsg);
                        setIsProcessing(false);
                        return [2 /*return*/];
                    }
                    // Log parsed text for debugging
                    console.log('=== FILE PARSED SUCCESSFULLY ===');
                    console.log('File name:', file.name);
                    console.log('File size:', file.size, 'bytes');
                    console.log('Extracted text length:', parseResult.text.length, 'characters');
                    console.log('Sample text (first 500 chars):', parseResult.text.substring(0, 500));
                    // Step 2: Extract metadata using Azure OpenAI
                    console.log('Step 2: Extracting metadata with AI...');
                    return [4 /*yield*/, openAIService.current.extractMetadata(parseResult.text)];
                case 3:
                    metadata = _b.sent();
                    // Step 3: Set the extracted metadata
                    console.log('Step 3: Setting extracted metadata...');
                    setExtractedMetadata(metadata);
                    console.log('=== FILE PROCESSING COMPLETE ===');
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _b.sent();
                    console.error('=== ERROR PROCESSING FILE ===');
                    console.error('Error type:', typeof error_1);
                    console.error('Error details:', error_1);
                    console.error('Error message:', error_1 instanceof Error ? error_1.message : String(error_1));
                    console.error('Error stack:', error_1 instanceof Error ? error_1.stack : 'N/A');
                    errorMsg = error_1 instanceof Error
                        ? error_1.message
                        : 'An error occurred while processing the document. Please fill the form manually.';
                    setProcessingError(errorMsg);
                    return [3 /*break*/, 6];
                case 5:
                    console.log('Setting isProcessing to false');
                    setIsProcessing(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    /**
     * Create an Audit Log item in SharePoint list.
     * Uses the provided list GUID and the internal field names seen in the URLs.
     */
    var createAuditLogItem = function (file, action) {
        if (action === void 0) { action = "Draft"; }
        return __awaiter(void 0, void 0, void 0, function () {
            var webUrl, currentUserResp, txt, currentUser, userId, body, postResp, respText, created, createdId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!props.context) {
                            throw new Error('SPFx context not provided to FileUpload component.');
                        }
                        webUrl = props.context.pageContext.web.absoluteUrl;
                        return [4 /*yield*/, props.context.spHttpClient.get("".concat(webUrl, "/_api/web/currentuser"), _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1)];
                    case 1:
                        currentUserResp = _a.sent();
                        if (!!currentUserResp.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, currentUserResp.text()];
                    case 2:
                        txt = _a.sent();
                        throw new Error("Failed to get current user: ".concat(currentUserResp.status, " ").concat(txt));
                    case 3: return [4 /*yield*/, currentUserResp.json()];
                    case 4:
                        currentUser = _a.sent();
                        userId = currentUser.Id;
                        body = {
                            "__metadata": { "type": "SP.Data.Audit_x0020_LogListItem" },
                            Title: file.name,
                            FileName: file.name,
                            Action: action,
                            // For a person field, set the internal field with 'Id' suffix
                            UserId: userId,
                            PerformedById: userId,
                            TimeStamp: new Date().toISOString()
                        };
                        console.log('Creating audit log item with payload:', body);
                        return [4 /*yield*/, props.context.spHttpClient.post("".concat(webUrl, "/_api/web/lists/GetByTitle('Audit Log')/items"), _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1, {
                                headers: {
                                    "Accept": "application/json;odata=verbose",
                                    "Content-Type": "application/json;odata=verbose",
                                    "odata-version": ""
                                },
                                body: JSON.stringify(body)
                            })];
                    case 5:
                        postResp = _a.sent();
                        return [4 /*yield*/, postResp.text()];
                    case 6:
                        respText = _a.sent();
                        if (!postResp.ok) {
                            console.error('Create audit item failed. Status:', postResp.status, 'Response:', respText);
                            throw new Error("Failed to create audit item: ".concat(postResp.status, " ").concat(respText));
                        }
                        created = null;
                        try {
                            created = respText ? JSON.parse(respText) : null;
                        }
                        catch (e) {
                            // If the response isn't JSON (depending on OData settings), log raw text
                            console.warn('Could not parse create response as JSON; raw response:', respText);
                        }
                        createdId = created && created.Id ? created.Id : null;
                        console.log('Audit log item created. ID (if returned):', createdId, 'rawResponse:', respText);
                        return [2 /*return*/, createdId];
                }
            });
        });
    };
    /**
     * Create item in KMArtifacts folder inside Document Library
     */
    var updateKMArtifactsMetadata = function (file) { return __awaiter(void 0, void 0, void 0, function () {
        var LIBRARY_NAME, webUrl, uploadResp, uploadJson, serverRelativeUrl, listItemResp, listItemJson, itemId, listInfoResp, listInfo, entityType, currentUserResp, currentUser, userId, metadataBody, updateResp, txt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    LIBRARY_NAME = "KMArtifacts";
                    webUrl = props.context.pageContext.web.absoluteUrl;
                    return [4 /*yield*/, props.context.spHttpClient.post("".concat(webUrl, "/_api/web/GetFolderByServerRelativeUrl('").concat(LIBRARY_NAME, "')/Files/add(url='").concat(file.name, "',overwrite=true)"), _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1, { body: file })];
                case 1:
                    uploadResp = _a.sent();
                    return [4 /*yield*/, uploadResp.json()];
                case 2:
                    uploadJson = _a.sent();
                    serverRelativeUrl = uploadJson.ServerRelativeUrl;
                    setKmFileUrl(serverRelativeUrl);
                    // 2️⃣ Wait briefly to ensure ListItem exists
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 500); })];
                case 3:
                    // 2️⃣ Wait briefly to ensure ListItem exists
                    _a.sent();
                    return [4 /*yield*/, props.context.spHttpClient.get("".concat(webUrl, "/_api/web/GetFileByServerRelativeUrl('").concat(serverRelativeUrl, "')/ListItemAllFields?$select=Id"), _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1)];
                case 4:
                    listItemResp = _a.sent();
                    return [4 /*yield*/, listItemResp.json()];
                case 5:
                    listItemJson = _a.sent();
                    itemId = listItemJson.Id;
                    return [4 /*yield*/, props.context.spHttpClient.get("".concat(webUrl, "/_api/web/lists/getbytitle('").concat(LIBRARY_NAME, "')?$select=ListItemEntityTypeFullName"), _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1)];
                case 6:
                    listInfoResp = _a.sent();
                    return [4 /*yield*/, listInfoResp.json()];
                case 7:
                    listInfo = _a.sent();
                    entityType = listInfo.ListItemEntityTypeFullName;
                    return [4 /*yield*/, props.context.spHttpClient.get("".concat(webUrl, "/_api/web/currentuser"), _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1)];
                case 8:
                    currentUserResp = _a.sent();
                    return [4 /*yield*/, currentUserResp.json()];
                case 9:
                    currentUser = _a.sent();
                    userId = currentUser.Id;
                    metadataBody = {
                        __metadata: { type: entityType },
                        Status: "Draft",
                        TitleName: "-",
                        Abstract: "-",
                        BusinessUnit: "-",
                        Department: "-",
                        Region: "-",
                        Client: "-",
                        DocumentType: "-",
                        DiseaseArea: "-",
                        TherapyArea: "-",
                        ComplianceFlag: false,
                        Sanitized: false,
                        PerformedById: userId,
                        TimeStamp: new Date().toISOString()
                    };
                    return [4 /*yield*/, props.context.spHttpClient.post("".concat(webUrl, "/_api/web/lists/getbytitle('KMArtifacts')/items(").concat(itemId, ")"), _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1, {
                            headers: {
                                "Accept": "application/json;odata=verbose",
                                "Content-Type": "application/json;odata=verbose",
                                "IF-MATCH": "*",
                                "X-HTTP-Method": "MERGE",
                                "odata-version": ""
                            },
                            body: JSON.stringify(metadataBody)
                        })];
                case 10:
                    updateResp = _a.sent();
                    if (!!updateResp.ok) return [3 /*break*/, 12];
                    return [4 /*yield*/, updateResp.text()];
                case 11:
                    txt = _a.sent();
                    console.error("KMArtifacts metadata update FAILED:", updateResp.status, txt);
                    throw new Error("KMArtifacts update failed: ".concat(updateResp.status, " ").concat(txt));
                case 12:
                    console.log("KMArtifacts metadata updated successfully for itemId:", itemId);
                    setKmItemId(itemId); // ⭐ store item id for later updates
                    return [2 /*return*/, itemId];
            }
        });
    }); };
    var updateKMArtifactsWithFormData = function (itemId, data) { return __awaiter(void 0, void 0, void 0, function () {
        var LIBRARY_NAME, webUrl, currentUserResp, currentUser, userId, listInfoResp, listInfo, entityType, payload, resp, _a;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    LIBRARY_NAME = "KMArtifacts";
                    webUrl = props.context.pageContext.web.absoluteUrl;
                    return [4 /*yield*/, props.context.spHttpClient.get("".concat(webUrl, "/_api/web/currentuser"), _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1)];
                case 1:
                    currentUserResp = _d.sent();
                    return [4 /*yield*/, currentUserResp.json()];
                case 2:
                    currentUser = _d.sent();
                    userId = currentUser.Id;
                    return [4 /*yield*/, props.context.spHttpClient.get("".concat(webUrl, "/_api/web/lists/getbytitle('").concat(LIBRARY_NAME, "')?$select=ListItemEntityTypeFullName"), _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1)];
                case 3:
                    listInfoResp = _d.sent();
                    return [4 /*yield*/, listInfoResp.json()];
                case 4:
                    listInfo = _d.sent();
                    entityType = listInfo.ListItemEntityTypeFullName;
                    payload = {
                        __metadata: { type: entityType },
                        Status: data.Status || "Submitted",
                        TitleName: data.title || "-",
                        Abstract: data.abstract || "-",
                        BusinessUnit: data.bu || "-",
                        Department: data.department || "-",
                        Region: data.region || "-",
                        Client: data.client || "-",
                        DocumentType: data.documentType || "-",
                        DiseaseArea: data.diseaseArea || "-",
                        TherapyArea: data.therapyArea || "-",
                        ComplianceFlag: (_b = data.complianceFlag) !== null && _b !== void 0 ? _b : false,
                        Sanitized: (_c = data.sanitized) !== null && _c !== void 0 ? _c : false,
                        PerformedById: userId,
                        TimeStamp: new Date().toISOString()
                    };
                    return [4 /*yield*/, props.context.spHttpClient.post("".concat(webUrl, "/_api/web/lists/getbytitle('").concat(LIBRARY_NAME, "')/items(").concat(itemId, ")"), _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__["SPHttpClient"].configurations.v1, {
                            headers: {
                                "Accept": "application/json;odata=verbose",
                                "Content-Type": "application/json;odata=verbose",
                                "IF-MATCH": "*",
                                "X-HTTP-Method": "MERGE",
                                "odata-version": ""
                            },
                            body: JSON.stringify(payload)
                        })];
                case 5:
                    resp = _d.sent();
                    if (!!resp.ok) return [3 /*break*/, 7];
                    _a = Error.bind;
                    return [4 /*yield*/, resp.text()];
                case 6: throw new (_a.apply(Error, [void 0, _d.sent()]))();
                case 7:
                    console.log("KMArtifacts updated with form data:", itemId);
                    return [2 /*return*/];
            }
        });
    }); };
    var onDrop = function (e) {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length) {
            onFileSelected(e.dataTransfer.files);
        }
    };
    var onFormSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Submitting metadata", data);
                    if (!kmItemId) {
                        console.error("KMArtifacts item id is missing");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    // 2️⃣ Create new Audit Log item (Action = Submitted)
                    return [4 /*yield*/, createAuditLogItem(uploadedFile, "Submitted")];
                case 2:
                    // 2️⃣ Create new Audit Log item (Action = Submitted)
                    _a.sent();
                    // 1️⃣ Update KMArtifacts row with actual form values
                    return [4 /*yield*/, updateKMArtifactsWithFormData(kmItemId, __assign(__assign({}, data), { Status: "Submitted" }))];
                case 3:
                    // 1️⃣ Update KMArtifacts row with actual form values
                    _a.sent();
                    setSuccessMessage("Your document has been submitted. The KM team will review it shortly.");
                    // optionally show success to user
                    console.log("Submission complete — KM notified.");
                    return [3 /*break*/, 5];
                case 4:
                    err_2 = _a.sent();
                    console.error("Error during form submission:", err_2);
                    setProcessingError("Submission failed. Check console for details.");
                    return [3 /*break*/, 5];
                case 5:
                    props.onClose && props.onClose();
                    return [2 /*return*/];
            }
        });
    }); };
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].overlay },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].modal, role: "dialog", "aria-modal": "true" }, !uploadedFile ? (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].uploadCard },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h3", { className: _FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].title }, "Upload Document"),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "".concat(_FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].dropZone, " ").concat(dragOver ? _FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].dropZoneHover : ''), onDragOver: function (e) { e.preventDefault(); setDragOver(true); }, onDragLeave: function () { return setDragOver(false); }, onDrop: onDrop, onClick: onBrowse, role: "button", "aria-label": "Upload file" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", { className: _FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].uploadIcon, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": true },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", { d: "M19 15v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", { d: "M7 9l5-5 5 5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", { d: "M12 4v12", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].hintText }, "Drag & drop files here"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].instructions }, "Supported formats: PDF, DOCX, PPTX, XLSX, MPP. Click browse or drop a file to start."),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: _FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].browseBtn, onClick: function (e) { e.stopPropagation(); onBrowse(); } }, "Browse files"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { ref: fileInputRef, type: "file", style: { display: 'none' }, accept: ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.mpp", onChange: function (e) { return onFileSelected(e.target.files); } })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].footer },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: _FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].closeBtn, onClick: function () { return props.onClose && props.onClose(); } }, "Close")))) : (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
            isProcessing ? (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].processingContainer },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].processingSpinner }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h3", { className: _FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].processingTitle }, "Analyzing Document..."),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { className: _FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].processingMessage }, "Reading your document and extracting information. This may take a moment."),
                processingError && (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _FileUpload_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].errorMessage }, processingError)))) : (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_MetadataForm_MetadataForm__WEBPACK_IMPORTED_MODULE_3__["MetadataForm"], { onSubmit: onFormSubmit, onClose: function () { return props.onClose && props.onClose(); }, initialValues: extractedMetadata || undefined })),
            successMessage && (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: {
                    backgroundColor: "#d4edda",
                    color: "#155724",
                    padding: "12px",
                    borderRadius: "6px",
                    marginTop: "10px",
                    border: "1px solid #c3e6cb",
                } }, successMessage)))))));
};
/* harmony default export */ __webpack_exports__["default"] = (FileUpload);


/***/ }),

/***/ "pU7z":
/*!********************************************************!*\
  !*** ./lib/webparts/migration/services/DataMasking.js ***!
  \********************************************************/
/*! exports provided: maskEmail, maskPhone, maskAllEmails, maskAllPhones */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "maskEmail", function() { return maskEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "maskPhone", function() { return maskPhone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "maskAllEmails", function() { return maskAllEmails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "maskAllPhones", function() { return maskAllPhones; });
/**
 * Utility functions for masking sensitive data
 */
/**
 * Mask the first 4 characters of an email address
 * Example: john.doe@example.com -> ****.doe@example.com
 */
function maskEmail(email) {
    if (!email || email.trim() === '') {
        return '';
    }
    var trimmed = email.trim();
    var atIndex = trimmed.indexOf('@');
    if (atIndex === -1 || atIndex <= 4) {
        // If @ is not found or within first 4 chars, mask first 4 chars
        return '****' + trimmed.substring(4);
    }
    // Mask first 4 characters before @
    return '****' + trimmed.substring(4);
}
/**
 * Mask the first 4 characters of a phone number
 * Example: +1-555-123-4567 -> ****-123-4567
 */
function maskPhone(phone) {
    if (!phone || phone.trim() === '') {
        return '';
    }
    var trimmed = phone.trim();
    // Remove common separators for masking, then add them back
    var cleaned = trimmed.replace(/[\s\-().]/g, '');
    if (cleaned.length <= 4) {
        return '****';
    }
    // Mask first 4 digits, preserve formatting
    var masked = '****';
    var originalIndex = 4;
    // Preserve separators after the masked portion
    for (var i = 4; i < trimmed.length; i++) {
        var char = trimmed[i];
        if (/[\s\-().]/.test(char)) {
            masked += char;
        }
        else {
            masked += trimmed[i];
            originalIndex++;
        }
    }
    return masked;
}
/**
 * Mask all emails in a comma-separated or newline-separated string
 */
function maskAllEmails(emailsString) {
    console.log('=== MASKING EMAILS ===');
    console.log('Input:', emailsString);
    if (!emailsString || emailsString.trim() === '') {
        console.log('No emails to mask (empty input)');
        return '';
    }
    // Split by comma, semicolon, or newline (handle various separators)
    var emails = emailsString
        .split(/[,;\n]/)
        .map(function (e) { return e.trim(); })
        .filter(function (e) { return e.length > 0; });
    console.log('Split emails:', emails);
    console.log('Email count:', emails.length);
    if (emails.length === 0) {
        console.log('No valid emails found after splitting');
        return '';
    }
    var masked = emails.map(maskEmail).join(', ');
    console.log('Masked result:', masked);
    return masked;
}
/**
 * Mask all phone numbers in a comma-separated or newline-separated string
 */
function maskAllPhones(phonesString) {
    if (!phonesString || phonesString.trim() === '') {
        return '';
    }
    // Split by comma or newline
    var phones = phonesString
        .split(/[,\n]/)
        .map(function (p) { return p.trim(); })
        .filter(function (p) { return p.length > 0; });
    return phones.map(maskPhone).join(', ');
}


/***/ }),

/***/ "pl06":
/*!********************************************************************************!*\
  !*** ./lib/webparts/migration/components/MetadataForm/MetadataForm.module.css ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!../../../../../node_modules/postcss-loader/src??postcss!./MetadataForm.module.css */ "9d9H");
var loader = __webpack_require__(/*! ./node_modules/@microsoft/loader-load-themed-styles/node_modules/@microsoft/load-themed-styles/lib/index.js */ "ruv1");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "qZeT":
/*!***************************************************************************!*\
  !*** ./lib/webparts/migration/pages/ServiceLinesPage/ServiceLinesPage.js ***!
  \***************************************************************************/
/*! exports provided: ServiceLinesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceLinesPage", function() { return ServiceLinesPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ServiceLinesPage_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ServiceLinesPage.module.scss */ "SHTI");


var ServiceLinesPage = function (props) {
    var serviceLines = ['SL 1', 'SL 2', 'SL 3', 'SL 4', 'SL 5', 'SL 6', 'SL 7'];
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _ServiceLinesPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].serviceLinesPage },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _ServiceLinesPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].contentContainer },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _ServiceLinesPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].buttonsGrid }, serviceLines.map(function (sl, index) { return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { key: index, className: _ServiceLinesPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].slButton }, sl)); })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: _ServiceLinesPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].carouselIndicators },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: "".concat(_ServiceLinesPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dot, " ").concat(_ServiceLinesPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].active) }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: _ServiceLinesPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dot }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: _ServiceLinesPage_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].dot })))));
};


/***/ }),

/***/ "rmnS":
/*!**************************************************************************************!*\
  !*** ./lib/webparts/migration/components/QuestionSection/QuestionSection.module.css ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!../../../../../node_modules/postcss-loader/src??postcss!./QuestionSection.module.css */ "FDHe");
var loader = __webpack_require__(/*! ./node_modules/@microsoft/loader-load-themed-styles/node_modules/@microsoft/load-themed-styles/lib/index.js */ "ruv1");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "ruv1":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/@microsoft/loader-load-themed-styles/node_modules/@microsoft/load-themed-styles/lib/index.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.
var __assign = (this && this.__assign) || function () {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitStyles = exports.detokenize = exports.clearStyles = exports.loadTheme = exports.flush = exports.configureRunMode = exports.configureLoadStyles = exports.loadStyles = void 0;
// Store the theming state in __themeState__ global scope for reuse in the case of duplicate
// load-themed-styles hosted on the page.
var _root = typeof window === 'undefined' ? global : window; // eslint-disable-line @typescript-eslint/no-explicit-any
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
                mode: 0 /* sync */,
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
        if (loadAsync || mode === 1 /* async */) {
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
exports.loadStyles = loadStyles;
/**
 * Allows for customizable loadStyles logic. e.g. for server side rendering application
 * @param {(processedStyles: string, rawStyles?: string | ThemableArray) => void}
 * a loadStyles callback that gets called when styles are loaded or reloaded
 */
function configureLoadStyles(loadStylesFn) {
    _themeState.loadStyles = loadStylesFn;
}
exports.configureLoadStyles = configureLoadStyles;
/**
 * Configure run mode of load-themable-styles
 * @param mode load-themable-styles run mode, async or sync
 */
function configureRunMode(mode) {
    _themeState.runState.mode = mode;
}
exports.configureRunMode = configureRunMode;
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
exports.flush = flush;
/**
 * register async loadStyles
 */
function asyncLoadStyles() {
    return setTimeout(function () {
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
exports.loadTheme = loadTheme;
/**
 * Clear already registered style elements and style records in theme_State object
 * @param option - specify which group of registered styles should be cleared.
 * Default to be both themable and non-themable styles will be cleared
 */
function clearStyles(option) {
    if (option === void 0) { option = 3 /* all */; }
    if (option === 3 /* all */ || option === 2 /* onlyNonThemable */) {
        clearStylesInternal(_themeState.registeredStyles);
        _themeState.registeredStyles = [];
    }
    if (option === 3 /* all */ || option === 1 /* onlyThemable */) {
        clearStylesInternal(_themeState.registeredThemableStyles);
        _themeState.registeredThemableStyles = [];
    }
}
exports.clearStyles = clearStyles;
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
            clearStyles(1 /* onlyThemable */);
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
exports.detokenize = detokenize;
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
exports.splitStyles = splitStyles;
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
//# sourceMappingURL=index.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../sp-build-web/node_modules/webpack/buildin/global.js */ "vicT")))

/***/ }),

/***/ "t7aT":
/*!************************************************************************************!*\
  !*** ./lib/webparts/migration/components/MetadataForm/MetadataForm.module.scss.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./MetadataForm.module.css */ "pl06");
var styles = {
    formWrapper: 'formWrapper_eb48e8e0',
    formInner: 'formInner_eb48e8e0',
    note: 'note_eb48e8e0',
    headerBar: 'headerBar_eb48e8e0',
    cardMeta: 'cardMeta_eb48e8e0',
    field: 'field_eb48e8e0',
    title: 'title_eb48e8e0',
    titleWrap: 'titleWrap_eb48e8e0',
    subtitle: 'subtitle_eb48e8e0',
    closeBtn: 'closeBtn_eb48e8e0',
    fieldFull: 'fieldFull_eb48e8e0',
    label: 'label_eb48e8e0',
    input: 'input_eb48e8e0',
    textarea: 'textarea_eb48e8e0',
    textareaScrollable: 'textareaScrollable_eb48e8e0',
    grid: 'grid_eb48e8e0',
    actions: 'actions_eb48e8e0',
    submitBtn: 'submitBtn_eb48e8e0'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "vicT":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "vlQI":
/*!*************************************!*\
  !*** external "@microsoft/sp-http" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_vlQI__;

/***/ }),

/***/ "wOCq":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??postcss!./lib/webparts/migration/components/FileUpload/FileUpload.module.css ***!
  \*******************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/runtime/api.js */ "Z+AG")(false);
// Module
exports.push([module.i, ".overlay_c09eba7f{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9999;font-family:Inter,sans-serif}.modal_c09eba7f,.overlay_c09eba7f{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.modal_c09eba7f{background:0 0;padding:0;border-radius:12px;width:auto;max-width:96%;box-shadow:none}.uploadCard_c09eba7f{background:#fff;padding:28px;border-radius:12px;width:760px;max-width:96%;box-shadow:0 18px 40px rgba(0,0,0,.25)}.title_c09eba7f{margin:0 0 12px 0;font-size:24px;text-align:center;font-weight:700;color:#1b3752;padding-bottom:10px;padding-top:10px}.dropZone_c09eba7f{border:2px dashed rgba(72,52,212,.25);border-radius:10px;padding:36px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;-ms-flex-direction:column;flex-direction:column;gap:10px;cursor:pointer;transition:border-color .18s ease,background .18s ease,box-shadow .18s ease;background:linear-gradient(180deg,rgba(245,243,255,.8),hsla(0,0%,100%,.6));box-shadow:0 6px 18px rgba(72,52,212,.06);text-align:center}.dropZoneHover_c09eba7f{border-color:#4834d4;background:linear-gradient(180deg,rgba(232,226,255,.95),rgba(245,243,255,.98));box-shadow:0 8px 28px rgba(72,52,212,.12)}.uploadIcon_c09eba7f{width:64px;height:64px;color:#4834d4;display:block}.hintText_c09eba7f{font-size:16px;color:#2f2f2f;font-weight:600}.instructions_c09eba7f{font-size:13px;color:#666}.browseBtn_c09eba7f{background-color:#4834d4;color:#fff;border:none;padding:10px 18px;border-radius:6px;cursor:pointer;font-weight:600}.footer_c09eba7f{display:-ms-flexbox;display:flex;-ms-flex-pack:end;justify-content:flex-end;margin-top:18px;gap:10px}.closeBtn_c09eba7f{background:0 0;border:1px solid #ddd;color:#333;padding:8px 14px;border-radius:6px;cursor:pointer}.fileName_c09eba7f{font-size:14px;color:#333;margin-bottom:12px}.processingContainer_c09eba7f{background:#fff;padding:48px 32px;border-radius:12px;width:600px;max-width:96%;box-shadow:0 18px 40px rgba(0,0,0,.25);display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;text-align:center}.processingSpinner_c09eba7f{width:48px;height:48px;border:4px solid rgba(72,52,212,.1);border-top-color:#4834d4;border-radius:50%;animation:spin_c09eba7f 1s linear infinite;margin-bottom:24px}@keyframes spin_c09eba7f{to{transform:rotate(1turn)}}.processingTitle_c09eba7f{font-size:20px;font-weight:700;color:#1b3752;margin:0 0 12px 0}.processingMessage_c09eba7f{font-size:14px;color:#666;margin:0;line-height:1.5}.errorMessage_c09eba7f{margin-top:20px;padding:12px 16px;background:#fee;border:1px solid #fcc;border-radius:6px;color:#c33;font-size:13px;max-width:100%}", ""]);


/***/ }),

/***/ "wSXW":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??postcss!./lib/webparts/migration/components/BUHeader/BUHeader.module.css ***!
  \***************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/runtime/api.js */ "Z+AG")(false);
// Module
exports.push([module.i, ".buHeader_a61c6b58{width:100%;background-color:#1976d2;padding:40px 60px;color:#fff;box-sizing:border-box;font-family:Inter,sans-serif}.headerContent_a61c6b58{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:start;align-items:flex-start;max-width:1400px;margin:0 auto}.leftSection_a61c6b58{-ms-flex:1;flex:1;position:relative}.backButton_a61c6b58{position:absolute;top:0;left:-40px;background-color:transparent;border:none;cursor:pointer;padding:8px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;transition:transform .2s,opacity .2s;z-index:10}.backButton_a61c6b58:hover{transform:translateX(-3px);opacity:.8}.backButton_a61c6b58:active{transform:translateX(-1px)}.backArrow_a61c6b58{width:24px;height:24px;-ms-flex-negative:0;flex-shrink:0}.buName_a61c6b58{font-size:48px;font-weight:700;margin:0 0 10px 0;color:#fff;font-family:Inter,sans-serif}.description_a61c6b58{margin:0 0 20px 0;opacity:.95;font-weight:400}.addFileButton_a61c6b58,.description_a61c6b58{font-size:16px;color:#fff;font-family:Inter,sans-serif}.addFileButton_a61c6b58{background-color:#1565c0;border:none;padding:12px 24px;cursor:pointer;border-radius:4px;font-weight:500;transition:background-color .3s}.addFileButton_a61c6b58:hover{background-color:#0d47a1}.rightSection_a61c6b58{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:end;align-items:flex-end;gap:20px}.buHead_a61c6b58{font-size:18px;color:#fff;font-weight:500;font-family:Inter,sans-serif}.searchContainer_a61c6b58{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;background-color:#fff;border-radius:4px;padding:8px 16px;min-width:300px}.searchIcon_a61c6b58{width:18px;height:18px;margin-right:10px;-ms-flex-negative:0;flex-shrink:0}.searchInput_a61c6b58{border:none;outline:0;-ms-flex:1;flex:1;font-size:16px;color:#333;background:0 0;font-family:Inter,sans-serif;font-weight:400}.searchInput_a61c6b58:-ms-input-placeholder{color:#999}.searchInput:-ms-input-placeholder{color:#999}.searchInput_a61c6b58::placeholder{color:#999}", ""]);


/***/ }),

/***/ "xOMW":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??postcss!./lib/webparts/migration/pages/CommunityPage/CommunityPage.module.css ***!
  \********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/runtime/api.js */ "Z+AG")(false);
// Module
exports.push([module.i, ".communityPage_01d0c138{width:100%;background-color:#e3f2fd;padding:40px 60px;box-sizing:border-box;height:330px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;font-family:Inter,sans-serif}.contentContainer_01d0c138{max-width:1400px;margin:0 auto;width:100%;box-sizing:border-box}.communitiesGrid_01d0c138{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;width:100%;box-sizing:border-box}@media (max-width:768px){.communitiesGrid_01d0c138{grid-template-columns:repeat(2,1fr)}}@media (max-width:480px){.communitiesGrid_01d0c138{grid-template-columns:1fr}}.communityCard_01d0c138{background-color:#64b5f6;padding:40px 30px;border-radius:6px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;min-height:150px;text-align:center;box-sizing:border-box;width:100%;max-width:100%;overflow:hidden}.communityText_01d0c138{font-size:18px;color:#fff;font-weight:500;font-family:Inter,sans-serif;margin:0;line-height:1.5;word-wrap:break-word;overflow-wrap:break-word}", ""]);


/***/ }),

/***/ "xgt8":
/*!***********************************************************************************!*\
  !*** ./lib/webparts/migration/pages/QuickLinksPage/QuickLinksPage.module.scss.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./QuickLinksPage.module.css */ "RFhd");
var styles = {
    quickLinksPage: 'quickLinksPage_19320504',
    pageContainer: 'pageContainer_19320504',
    quickLinksSidebar: 'quickLinksSidebar_19320504',
    sidebarTitle: 'sidebarTitle_19320504',
    linksList: 'linksList_19320504',
    linkItem: 'linkItem_19320504',
    linkArrow: 'linkArrow_19320504'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "xn79":
/*!*****************************************************************************!*\
  !*** ./lib/webparts/migration/pages/CommunityPage/CommunityPage.module.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!../../../../../node_modules/postcss-loader/src??postcss!./CommunityPage.module.css */ "xOMW");
var loader = __webpack_require__(/*! ./node_modules/@microsoft/loader-load-themed-styles/node_modules/@microsoft/load-themed-styles/lib/index.js */ "ruv1");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "z0tS":
/*!**********************************************************************************!*\
  !*** ./lib/webparts/migration/components/BUContentArea/BUContentArea.module.css ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!../../../../../node_modules/postcss-loader/src??postcss!./BUContentArea.module.css */ "6hHN");
var loader = __webpack_require__(/*! ./node_modules/@microsoft/loader-load-themed-styles/node_modules/@microsoft/load-themed-styles/lib/index.js */ "ruv1");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ })

/******/ })});;
//# sourceMappingURL=migration-web-part.js.map