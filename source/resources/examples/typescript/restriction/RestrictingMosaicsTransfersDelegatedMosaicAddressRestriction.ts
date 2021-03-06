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

import {
    Account,
    Address,
    AggregateTransaction,
    Deadline,
    KeyGenerator,
    MosaicAddressRestrictionTransaction,
    MosaicId,
    NetworkType,
    TransactionHttp,
    UInt64
} from 'nem2-sdk';

/* start block 01 */
const mosaicIdHex = process.env.MOSAIC_ID as string;
const mosaicId = new MosaicId(mosaicIdHex);

const aliceRawAddress = 'SDDOLW-ESKH33-YYW5XF-42F3ZJ-ZL6JIA-DP4TFT-H6RH';
const aliceAddress = Address.createFromRawAddress(aliceRawAddress);

const bobRawAddress = 'SDI4YV-LEDOHE-NVRPRX-7P3Q3P-RXNJQW-S2YPGA-SA2Q';
const bobAddress = Address.createFromRawAddress(bobRawAddress);

const carolRawAddress = 'SC5ZKF-GHOMJQ-RN2HEM-GYL5QU-YF7IOQ-E3IHC2-ZICE';
const carolAddress = Address.createFromRawAddress(carolRawAddress);

const key = KeyGenerator.generateUInt64Key('IsVerified'.toLowerCase());

const aliceMosaicAddressRestrictionTransaction = MosaicAddressRestrictionTransaction
    .create(
        Deadline.create(),
        mosaicId, // mosaicId
        key, // restrictionKey
        aliceAddress, // address
        UInt64.fromUint(1), // newRestrictionValue
        NetworkType.MIJIN_TEST);

const bobMosaicAddressRestrictionTransaction = MosaicAddressRestrictionTransaction
    .create(
        Deadline.create(),
        mosaicId, // mosaicId
        key, // restictionKey
        bobAddress, // address
        UInt64.fromUint(2), // newRestrictionValue
        NetworkType.MIJIN_TEST);

const carolMosaicAddressRestrictionTransaction = MosaicAddressRestrictionTransaction
    .create(
        Deadline.create(),
        mosaicId, // mosaicId
        key, // restictionKey
        carolAddress, // address
        UInt64.fromUint(2), // newRestrictionValue
        NetworkType.MIJIN_TEST);

const kycProviderPrivateKey = process.env.KYC_PROVIDER_PRIVATE_KEY as string;
const kycProviderAccount = Account.createFromPrivateKey(kycProviderPrivateKey, NetworkType.MIJIN_TEST);
const networkGenerationHash = process.env.NETWORK_GENERATION_HASH as string;

const aggregateTransaction = AggregateTransaction.createComplete(
    Deadline.create(),
    [
        aliceMosaicAddressRestrictionTransaction.toAggregate(kycProviderAccount.publicAccount),
        bobMosaicAddressRestrictionTransaction.toAggregate(kycProviderAccount.publicAccount),
        carolMosaicAddressRestrictionTransaction.toAggregate(kycProviderAccount.publicAccount)
    ],
    NetworkType.MIJIN_TEST,
    []
);

const signedTransaction = kycProviderAccount.sign(aggregateTransaction, networkGenerationHash);
console.log(signedTransaction.hash);

const transactionHttp = new TransactionHttp('http://localhost:3000');
transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
/* end block 01 */
