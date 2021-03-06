"use strict";
/*
 *
 * Copyright 2018-present NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const nem2_sdk_1 = require("nem2-sdk");
/* start block 01 */
const mosaicIdHex = process.env.MOSAIC_ID;
const mosaicId = new nem2_sdk_1.MosaicId(mosaicIdHex);
const aliceRawAddress = 'SDDOLW-ESKH33-YYW5XF-42F3ZJ-ZL6JIA-DP4TFT-H6RH';
const aliceAddress = nem2_sdk_1.Address.createFromRawAddress(aliceRawAddress);
const bobRawAddress = 'SDI4YV-LEDOHE-NVRPRX-7P3Q3P-RXNJQW-S2YPGA-SA2Q';
const bobAddress = nem2_sdk_1.Address.createFromRawAddress(bobRawAddress);
const carolRawAddress = 'SC5ZKF-GHOMJQ-RN2HEM-GYL5QU-YF7IOQ-E3IHC2-ZICE';
const carolAddress = nem2_sdk_1.Address.createFromRawAddress(carolRawAddress);
const key = nem2_sdk_1.KeyGenerator.generateUInt64Key('IsVerified'.toLowerCase());
const aliceMosaicAddressRestrictionTransaction = nem2_sdk_1.MosaicAddressRestrictionTransaction
    .create(nem2_sdk_1.Deadline.create(), mosaicId, // mosaicId
key, // restrictionKey
aliceAddress, // address
nem2_sdk_1.UInt64.fromUint(1), // newRestrictionValue
nem2_sdk_1.NetworkType.MIJIN_TEST);
const bobMosaicAddressRestrictionTransaction = nem2_sdk_1.MosaicAddressRestrictionTransaction
    .create(nem2_sdk_1.Deadline.create(), mosaicId, // mosaicId
key, // restictionKey
bobAddress, // address
nem2_sdk_1.UInt64.fromUint(2), // newRestrictionValue
nem2_sdk_1.NetworkType.MIJIN_TEST);
const carolMosaicAddressRestrictionTransaction = nem2_sdk_1.MosaicAddressRestrictionTransaction
    .create(nem2_sdk_1.Deadline.create(), mosaicId, // mosaicId
key, // restictionKey
carolAddress, // address
nem2_sdk_1.UInt64.fromUint(2), // newRestrictionValue
nem2_sdk_1.NetworkType.MIJIN_TEST);
const kycProviderPrivateKey = process.env.KYC_PROVIDER_PRIVATE_KEY;
const kycProviderAccount = nem2_sdk_1.Account.createFromPrivateKey(kycProviderPrivateKey, nem2_sdk_1.NetworkType.MIJIN_TEST);
const networkGenerationHash = process.env.NETWORK_GENERATION_HASH;
const aggregateTransaction = nem2_sdk_1.AggregateTransaction.createComplete(nem2_sdk_1.Deadline.create(), [
    aliceMosaicAddressRestrictionTransaction.toAggregate(kycProviderAccount.publicAccount),
    bobMosaicAddressRestrictionTransaction.toAggregate(kycProviderAccount.publicAccount),
    carolMosaicAddressRestrictionTransaction.toAggregate(kycProviderAccount.publicAccount)
], nem2_sdk_1.NetworkType.MIJIN_TEST, []);
const signedTransaction = kycProviderAccount.sign(aggregateTransaction, networkGenerationHash);
console.log(signedTransaction.hash);
const transactionHttp = new nem2_sdk_1.TransactionHttp('http://localhost:3000');
transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
/* end block 01 */
