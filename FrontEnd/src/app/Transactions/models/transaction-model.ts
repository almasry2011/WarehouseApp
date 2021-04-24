import { TransactionLineModel } from './transaction-line-model';
import { PartnerModel } from './../../Partners/models/partner-model';
export interface TransactionModel {
  transactionType?: number;
  transactionTypeStr?: string;
  partnerName?: string;
  total?: number;
  partnerId?: number;
  createdBy?: any;
  createdAt?: string;
  _partner?: PartnerModel;
  _transactionLines?: TransactionLineModel[];
  id?: number;
}
