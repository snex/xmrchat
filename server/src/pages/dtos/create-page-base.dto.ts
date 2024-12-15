import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { SupportedDisplayCurrency } from 'src/shared/constants';
import { IsMoneroPrimaryAdrress } from 'src/shared/validations/monero-primary-address.validation';
import { IsMoneroSecretView } from 'src/shared/validations/monero-secret-view.validation';

export class CreatePageBaseDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(64)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(4096)
  description?: string;

  @Validate(IsMoneroPrimaryAdrress)
  primaryAddress: string;

  @Validate(IsMoneroSecretView)
  secretViewKey: string;

  @IsString()
  @IsOptional()
  @MaxLength(64)
  twitchChannel?: string;

  @IsEnum(SupportedDisplayCurrency)
  @IsOptional()
  defaultTipAmountDisplay?: SupportedDisplayCurrency;

  @IsBoolean()
  isPublic: boolean;

  @IsNumber()
  coverImage: number;

  @IsNumber()
  logo: number;
}
