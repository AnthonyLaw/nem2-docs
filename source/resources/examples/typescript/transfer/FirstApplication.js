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
const mosaicId = process.env.MOSAIC_ID;
const address = process.env.ADDRESS;
const transferTransaction = nem2_sdk_1.TransferTransaction.create(nem2_sdk_1.Deadline.create(), nem2_sdk_1.Address.createFromRawAddress(address), [new nem2_sdk_1.Mosaic(new nem2_sdk_1.MosaicId(mosaicId), nem2_sdk_1.UInt64.fromUint(1))], nem2_sdk_1.PlainMessage.create('enjoy your ticket'), nem2_sdk_1.NetworkType.MIJIN_TEST);
/* end block 01 */
/* start block 02 */
const privateKey = process.env.PRIVATE_KEY;
const networkGenerationHash = process.env.NETWORK_GENERATION_HASH;
const account = nem2_sdk_1.Account.createFromPrivateKey(privateKey, nem2_sdk_1.NetworkType.MIJIN_TEST);
const signedTransaction = account.sign(transferTransaction, networkGenerationHash);
/* end block 02 */
/* start block 03 */
const transactionHttp = new nem2_sdk_1.TransactionHttp('http://localhost:3000');
transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
/* end block 03 */
