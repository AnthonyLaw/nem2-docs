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
// 01 - Create Transfer Transaction
const recipientRawAddress = process.env.RECIPIENT_RAW_ADDRESS;
const recipientAddress = nem2_sdk_1.Address.createFromRawAddress(recipientRawAddress);
const transferTransaction = nem2_sdk_1.TransferTransaction.create(nem2_sdk_1.Deadline.create(), recipientAddress, 
/* start block 01 */
[new nem2_sdk_1.Mosaic(new nem2_sdk_1.MosaicId('7cdf3b117a3c40cc'), nem2_sdk_1.UInt64.fromUint(1000)),
    nem2_sdk_1.NetworkCurrencyMosaic.createRelative(10)], 
/* end block 01 */
nem2_sdk_1.PlainMessage.create('This is a test message'), nem2_sdk_1.NetworkType.MIJIN_TEST);
// 02 - Signing the transaction
const privateKey = process.env.PRIVATE_KEY;
const account = nem2_sdk_1.Account.createFromPrivateKey(privateKey, nem2_sdk_1.NetworkType.MIJIN_TEST);
const networkGenerationHash = process.env.NETWORK_GENERATION_HASH;
const signedTransaction = account.sign(transferTransaction, networkGenerationHash);
// 03 - Announcing the transaction
const transactionHttp = new nem2_sdk_1.TransactionHttp('http://localhost:3000');
transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
