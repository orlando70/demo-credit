"use strict";
var __extends = (this && this.__extends) || (function () {
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ValidateTransactionRequest = exports.WithdrawRequest = exports.TransferRequest = exports.FundRequest = exports.RegisterRequest = exports.LoginRequest = void 0;
var class_validator_1 = require("class-validator");
var enum_1 = require("../../payment/types/enum");
var LoginRequest = /** @class */ (function () {
    function LoginRequest() {
    }
    __decorate([
        (0, class_validator_1.IsEmail)()
    ], LoginRequest.prototype, "email");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], LoginRequest.prototype, "password");
    return LoginRequest;
}());
exports.LoginRequest = LoginRequest;
var RegisterRequest = /** @class */ (function () {
    function RegisterRequest() {
    }
    __decorate([
        (0, class_validator_1.IsEmail)()
    ], RegisterRequest.prototype, "email");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(6, {
            message: 'Password should contain at least 6 characters'
        })
    ], RegisterRequest.prototype, "password");
    return RegisterRequest;
}());
exports.RegisterRequest = RegisterRequest;
var FundRequest = /** @class */ (function () {
    function FundRequest() {
    }
    __decorate([
        (0, class_validator_1.IsNumber)()
    ], FundRequest.prototype, "userId");
    __decorate([
        (0, class_validator_1.IsNumber)()
    ], FundRequest.prototype, "amount");
    return FundRequest;
}());
exports.FundRequest = FundRequest;
var TransferRequest = /** @class */ (function (_super) {
    __extends(TransferRequest, _super);
    function TransferRequest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsNumber)()
    ], TransferRequest.prototype, "walletId");
    return TransferRequest;
}(FundRequest));
exports.TransferRequest = TransferRequest;
var WithdrawRequest = /** @class */ (function (_super) {
    __extends(WithdrawRequest, _super);
    function WithdrawRequest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsString)()
    ], WithdrawRequest.prototype, "bankCode");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.Length)(10)
    ], WithdrawRequest.prototype, "accountNumber");
    return WithdrawRequest;
}(FundRequest));
exports.WithdrawRequest = WithdrawRequest;
var ValidateTransactionRequest = /** @class */ (function () {
    function ValidateTransactionRequest() {
    }
    __decorate([
        (0, class_validator_1.IsEnum)(enum_1.PaystackEventEnum)
    ], ValidateTransactionRequest.prototype, "event");
    __decorate([
        (0, class_validator_1.IsObject)()
    ], ValidateTransactionRequest.prototype, "data");
    return ValidateTransactionRequest;
}());
exports.ValidateTransactionRequest = ValidateTransactionRequest;
