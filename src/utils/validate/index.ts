import { IsString, IsEmail, MinLength, IsNotEmpty, IsNumber, Length, IsEnum, IsObject } from 'class-validator';
import { PaystackEventEnum } from '../../payment/types/enum';

export class LoginRequest {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}


export class RegisterRequest {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6, {
        message: 'Password should contain at least 6 characters',
    })
    password: string;
}

export class FundRequest {
    @IsNumber()
    userId: number;

    @IsNumber()
    amount: number;
}

export class TransferRequest extends FundRequest{
    @IsNumber()
    walletId: number;
}


export class WithdrawRequest extends FundRequest{
    @IsString()
    bankCode: string;

    @IsString()
    @Length(10)
    accountNumber: string;
}

export class ValidateTransactionRequest {
    @IsEnum(PaystackEventEnum)
    event: PaystackEventEnum;

    @IsObject()
    data: Object;
}

export class GetUserRequest {
    @IsNumber()
    userId: number;
}