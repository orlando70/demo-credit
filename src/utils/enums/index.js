"use strict";
exports.__esModule = true;
exports.TokenFlagEnum = exports.TransactionStatusEnum = exports.TransactionTypeEnum = void 0;
var TransactionTypeEnum;
(function (TransactionTypeEnum) {
    TransactionTypeEnum["DEPOSIT"] = "deposit";
    TransactionTypeEnum["WITHDRAWAL"] = "withdrawal";
    TransactionTypeEnum["TRANSFER"] = "transfer";
})(TransactionTypeEnum = exports.TransactionTypeEnum || (exports.TransactionTypeEnum = {}));
var TransactionStatusEnum;
(function (TransactionStatusEnum) {
    TransactionStatusEnum["SUCCESS"] = "success";
    TransactionStatusEnum["FAIL"] = "fail";
    TransactionStatusEnum["PENDING"] = "pending";
})(TransactionStatusEnum = exports.TransactionStatusEnum || (exports.TransactionStatusEnum = {}));
var TokenFlagEnum;
(function (TokenFlagEnum) {
    TokenFlagEnum["AUTH"] = "auth";
})(TokenFlagEnum = exports.TokenFlagEnum || (exports.TokenFlagEnum = {}));
