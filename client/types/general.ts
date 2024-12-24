import type { PageSettingKey, SupportedDisplayCurrency } from "./enums";

export type Numberic = string | number;

export interface LoginResponse {
  access_token: string;
}

export interface MeResponse {
  user?: User;
  page?: StreamerPage;
}

export interface User {
  username: string;
  email: string;
  id: string;
}

export interface CreateFormFields {
  logo?: Numberic;
  coverImage?: Numberic;
  primaryAddress?: string;
  secretViewKey?: string;
  path?: string;
  tiers?: TipTierField[];
  twitchChannel?: string;
  minTipAmount?: string;
  isPublic?: boolean;
  defaultTipAmountDisplay?: SupportedDisplayCurrency;
}

export interface TipFormFields {
  private?: boolean;
  name?: string;
  message?: string;
  amount?: any;
}

export interface SlugReservationResponse {
  paymentAddress: string;
  amount: number;
  reservedUntil: number;
}

export interface TipCreationResponse {
  amount: string;
  id: number;
  paymentAddress: string;
  tip: Tip;
  swap?: Swap;
}

export interface StreamerPage {
  userId: string;
  id: string;
  name: string;
  path: string;
  logo: UploadedFile;
  coverImage: UploadedFile;
  adult: boolean;
  primaryAddress?: string;
  secretViewKey?: string;
  tiers?: TipTier[];
  twitchChannel?: string;
  minTipAmount?: string;
  isPublic: boolean;
  defaultTipAmountDisplay?: SupportedDisplayCurrency;
  links?: PageLink[];
}

interface TipPayment {
  amount: string;
  id: number;
  paidAmount: string;
}

export interface Tip {
  id: string;
  pageId: string;
  name: string;
  message: string;
  private?: boolean;
  paidAt?: string;
  payment?: TipPayment;
  swap?: Swap;
}

export interface TipTier {
  amount: string;
  name?: string;
  description?: string;
  id: string;
}

export interface TipTierField {
  name?: string;
  description?: string;
  amount?: string;
}

export interface PaymentSocketMessage {
  paidAt: Date;
  amount: string;
  paidAmount: string;
}

export interface TipEventData {
  paidAt: Date;
  amount: string;
  paidAmount: string;
}

export interface ObsTip {
  amount: string;
  message: string;
  name: string;
  id?: string;
}

export interface ObsTipSocketMessage {
  amount: string;
  paidAmount: string;
  name: string;
  message: string;
}

export interface UploadedFile {
  filename: string;
  originalName: string;
  type: UploadedFile;
  url: string;
  thumbnail?: string;
  id: number;
}

export interface PageSetting {
  key: PageSettingKey;
  value?: any;
  category: string;
}

export interface PageSettingField {
  key: PageSettingKey;
  value?: any;
}

export interface PageLinkPLatform {}

export interface PageLink {
  platform: PageLinkPLatform;
  value: string;
}

export interface Coin {
  id: number;
  name: string;
  ticker: string;
  network: string;
  image: string;
  minimum: number;
  maximum: number;
}

export interface Swap {
  id: number;
  platform: string;
  swapId: string;
  inputAmount: string;
  swapAddress: string;
  status: string;
  coin: Coin;
  statusMessage: string;
  createdAt: Date;
  updatedAt: Date;
}
