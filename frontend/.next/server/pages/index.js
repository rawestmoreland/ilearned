"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./components/Layout.js":
/*!******************************!*\
  !*** ./components/Layout.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Loading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Loading */ \"./components/Loading.js\");\n\n\n\n\nconst Layout = ({ children , ...props })=>{\n    const { 0: loading , 1: setLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const handleStart = ()=>setLoading(true)\n        ;\n        const handleComplete = ()=>setLoading(false)\n        ;\n        router.events.on(\"routeChangeStart\", handleStart);\n        router.events.on(\"routeChangeComplete\", handleComplete);\n        router.events.on(\"routeChangeError\", handleComplete);\n        return function cleanup() {\n            handleComplete;\n        };\n    }, [\n        router\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Loading__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                loading: loading\n            }, void 0, false, {\n                fileName: \"/Users/richard/strapi/ilearned/frontend/components/Layout.js\",\n                lineNumber: 26,\n                columnNumber: 4\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: `${loading ? \"hidden\" : \"container flex flex-col gap-y-4 md:grid md:grid-cols-4 md:gap-x-8 font-poppins py-12\"}`,\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"md:col-span-3\",\n                    children: children\n                }, void 0, false, {\n                    fileName: \"/Users/richard/strapi/ilearned/frontend/components/Layout.js\",\n                    lineNumber: 34,\n                    columnNumber: 5\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/richard/strapi/ilearned/frontend/components/Layout.js\",\n                lineNumber: 27,\n                columnNumber: 4\n            }, undefined)\n        ]\n    }, void 0, true);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0xheW91dC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQTJDO0FBRUo7QUFFUjtBQUUvQixNQUFNSSxNQUFNLEdBQUcsQ0FBQyxFQUFFQyxRQUFRLEdBQUUsR0FBR0MsS0FBSyxFQUFFLEdBQUs7SUFDMUMsTUFBTSxFQVBQLEdBT1FDLE9BQU8sR0FQZixHQU9pQkMsVUFBVSxNQUFJUiwrQ0FBUSxDQUFDLEtBQUssQ0FBQztJQUM3QyxNQUFNUyxNQUFNLEdBQUdQLHNEQUFTLEVBQUU7SUFFMUJELGdEQUFTLENBQUMsSUFBTTtRQUNmLE1BQU1TLFdBQVcsR0FBRyxJQUFNRixVQUFVLENBQUMsSUFBSSxDQUFDO1FBQUE7UUFFMUMsTUFBTUcsY0FBYyxHQUFHLElBQU1ILFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFBQTtRQUU5Q0MsTUFBTSxDQUFDRyxNQUFNLENBQUNDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRUgsV0FBVyxDQUFDO1FBQ2pERCxNQUFNLENBQUNHLE1BQU0sQ0FBQ0MsRUFBRSxDQUFDLHFCQUFxQixFQUFFRixjQUFjLENBQUM7UUFDdkRGLE1BQU0sQ0FBQ0csTUFBTSxDQUFDQyxFQUFFLENBQUMsa0JBQWtCLEVBQUVGLGNBQWMsQ0FBQztRQUNwRCxPQUFPLFNBQVNHLE9BQU8sR0FBRztZQUN6QkgsY0FBYztTQUNkO0tBQ0QsRUFBRTtRQUFDRixNQUFNO0tBQUMsQ0FBQztJQUVaLHFCQUNDOzswQkFDQyw4REFBQ04sZ0RBQU87Z0JBQUNJLE9BQU8sRUFBRUEsT0FBTzs7Ozs7eUJBQUk7MEJBQzdCLDhEQUFDUSxLQUFHO2dCQUNIQyxTQUFTLEVBQUUsQ0FBQyxFQUNYVCxPQUFPLEdBQ0osUUFBUSxHQUNSLHNGQUFzRixDQUN6RixDQUFDOzBCQUVGLDRFQUFDUSxLQUFHO29CQUFDQyxTQUFTLEVBQUMsZUFBZTs4QkFBRVgsUUFBUTs7Ozs7NkJBQU87Ozs7O3lCQUMxQzs7b0JBQ0osQ0FDSDtDQUNEO0FBRUQsaUVBQWVELE1BQU0iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcm9udGVuZC8uL2NvbXBvbmVudHMvTGF5b3V0LmpzPzUxNWMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0J1xuXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcidcblxuaW1wb3J0IExvYWRpbmcgZnJvbSAnLi9Mb2FkaW5nJ1xuXG5jb25zdCBMYXlvdXQgPSAoeyBjaGlsZHJlbiwgLi4ucHJvcHMgfSkgPT4ge1xuXHRjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSlcblx0Y29uc3Qgcm91dGVyID0gdXNlUm91dGVyKClcblxuXHR1c2VFZmZlY3QoKCkgPT4ge1xuXHRcdGNvbnN0IGhhbmRsZVN0YXJ0ID0gKCkgPT4gc2V0TG9hZGluZyh0cnVlKVxuXG5cdFx0Y29uc3QgaGFuZGxlQ29tcGxldGUgPSAoKSA9PiBzZXRMb2FkaW5nKGZhbHNlKVxuXG5cdFx0cm91dGVyLmV2ZW50cy5vbigncm91dGVDaGFuZ2VTdGFydCcsIGhhbmRsZVN0YXJ0KVxuXHRcdHJvdXRlci5ldmVudHMub24oJ3JvdXRlQ2hhbmdlQ29tcGxldGUnLCBoYW5kbGVDb21wbGV0ZSlcblx0XHRyb3V0ZXIuZXZlbnRzLm9uKCdyb3V0ZUNoYW5nZUVycm9yJywgaGFuZGxlQ29tcGxldGUpXG5cdFx0cmV0dXJuIGZ1bmN0aW9uIGNsZWFudXAoKSB7XG5cdFx0XHRoYW5kbGVDb21wbGV0ZVxuXHRcdH1cblx0fSwgW3JvdXRlcl0pXG5cblx0cmV0dXJuIChcblx0XHQ8PlxuXHRcdFx0PExvYWRpbmcgbG9hZGluZz17bG9hZGluZ30gLz5cblx0XHRcdDxkaXZcblx0XHRcdFx0Y2xhc3NOYW1lPXtgJHtcblx0XHRcdFx0XHRsb2FkaW5nXG5cdFx0XHRcdFx0XHQ/ICdoaWRkZW4nXG5cdFx0XHRcdFx0XHQ6ICdjb250YWluZXIgZmxleCBmbGV4LWNvbCBnYXAteS00IG1kOmdyaWQgbWQ6Z3JpZC1jb2xzLTQgbWQ6Z2FwLXgtOCBmb250LXBvcHBpbnMgcHktMTInXG5cdFx0XHRcdH1gfVxuXHRcdFx0PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nbWQ6Y29sLXNwYW4tMyc+e2NoaWxkcmVufTwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0PC8+XG5cdClcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF5b3V0XG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VSb3V0ZXIiLCJMb2FkaW5nIiwiTGF5b3V0IiwiY2hpbGRyZW4iLCJwcm9wcyIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwicm91dGVyIiwiaGFuZGxlU3RhcnQiLCJoYW5kbGVDb21wbGV0ZSIsImV2ZW50cyIsIm9uIiwiY2xlYW51cCIsImRpdiIsImNsYXNzTmFtZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/Layout.js\n");

/***/ }),

/***/ "./components/Loading.js":
/*!*******************************!*\
  !*** ./components/Loading.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_spinners_PacmanLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-spinners/PacmanLoader */ \"react-spinners/PacmanLoader\");\n/* harmony import */ var react_spinners_PacmanLoader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_spinners_PacmanLoader__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst Loading = ({ loading  })=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: `${loading ? \"flex items-center justify-center h-screen w-screen\" : \"hidden\"}`,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((react_spinners_PacmanLoader__WEBPACK_IMPORTED_MODULE_1___default()), {\n            loading: loading,\n            color: \"#272727\"\n        }, void 0, false, {\n            fileName: \"/Users/richard/strapi/ilearned/frontend/components/Loading.js\",\n            lineNumber: 12,\n            columnNumber: 4\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/Users/richard/strapi/ilearned/frontend/components/Loading.js\",\n        lineNumber: 5,\n        columnNumber: 3\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Loading);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0xvYWRpbmcuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUFzRDtBQUV0RCxNQUFNQyxPQUFPLEdBQUcsQ0FBQyxFQUFFQyxPQUFPLEdBQUUsR0FBSztJQUNoQyxxQkFDQyw4REFBQ0MsS0FBRztRQUNIQyxTQUFTLEVBQUUsQ0FBQyxFQUNYRixPQUFPLEdBQ0osb0RBQW9ELEdBQ3BELFFBQVEsQ0FDWCxDQUFDO2tCQUVGLDRFQUFDRixvRUFBWTtZQUFDRSxPQUFPLEVBQUVBLE9BQU87WUFBRUcsS0FBSyxFQUFDLFNBQVM7Ozs7O3FCQUFHOzs7OztpQkFDN0MsQ0FDTjtDQUNEO0FBRUQsaUVBQWVKLE9BQU8iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcm9udGVuZC8uL2NvbXBvbmVudHMvTG9hZGluZy5qcz9hMWE2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYWNtYW5Mb2FkZXIgZnJvbSAncmVhY3Qtc3Bpbm5lcnMvUGFjbWFuTG9hZGVyJ1xuXG5jb25zdCBMb2FkaW5nID0gKHsgbG9hZGluZyB9KSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PGRpdlxuXHRcdFx0Y2xhc3NOYW1lPXtgJHtcblx0XHRcdFx0bG9hZGluZ1xuXHRcdFx0XHRcdD8gJ2ZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGgtc2NyZWVuIHctc2NyZWVuJ1xuXHRcdFx0XHRcdDogJ2hpZGRlbidcblx0XHRcdH1gfVxuXHRcdD5cblx0XHRcdDxQYWNtYW5Mb2FkZXIgbG9hZGluZz17bG9hZGluZ30gY29sb3I9JyMyNzI3MjcnIC8+XG5cdFx0PC9kaXY+XG5cdClcbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9hZGluZ1xuIl0sIm5hbWVzIjpbIlBhY21hbkxvYWRlciIsIkxvYWRpbmciLCJsb2FkaW5nIiwiZGl2IiwiY2xhc3NOYW1lIiwiY29sb3IiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/Loading.js\n");

/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Home)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Layout */ \"./components/Layout.js\");\n\n\nfunction Home() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Layout__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: \"butts\"\n        }, void 0, false, {\n            fileName: \"/Users/richard/strapi/ilearned/frontend/pages/index.js\",\n            lineNumber: 6,\n            columnNumber: 4\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/richard/strapi/ilearned/frontend/pages/index.js\",\n        lineNumber: 5,\n        columnNumber: 3\n    }, this);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFBeUM7QUFFMUIsU0FBU0MsSUFBSSxHQUFHO0lBQzlCLHFCQUNDLDhEQUFDRCwwREFBTTtrQkFDTiw0RUFBQ0UsS0FBRztzQkFBQyxPQUFLOzs7OztnQkFBTTs7Ozs7WUFDUixDQUNUO0NBQ0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcm9udGVuZC8uL3BhZ2VzL2luZGV4LmpzP2JlZTciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExheW91dCBmcm9tICcuLi9jb21wb25lbnRzL0xheW91dCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSG9tZSgpIHtcblx0cmV0dXJuIChcblx0XHQ8TGF5b3V0PlxuXHRcdFx0PGRpdj5idXR0czwvZGl2PlxuXHRcdDwvTGF5b3V0PlxuXHQpXG59XG4iXSwibmFtZXMiOlsiTGF5b3V0IiwiSG9tZSIsImRpdiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react-spinners/PacmanLoader":
/*!**********************************************!*\
  !*** external "react-spinners/PacmanLoader" ***!
  \**********************************************/
/***/ ((module) => {

module.exports = require("react-spinners/PacmanLoader");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/index.js"));
module.exports = __webpack_exports__;

})();