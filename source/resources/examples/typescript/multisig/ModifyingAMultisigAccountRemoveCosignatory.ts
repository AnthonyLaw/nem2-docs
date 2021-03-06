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
    AggregateTransaction,
    Deadline,
    MultisigAccountModificationTransaction,
    MultisigCosignatoryModification,
    CosignatoryModificationAction,
    NetworkType,
    PublicAccount,
    TransactionHttp
} from "nem2-sdk";

/* start block 01 */
const multisigAccountPublicKey = process.env.MULTISIG_ACCOUNT_PUBLIC_KEY as string;
const multisigAccount = PublicAccount.createFromPublicKey(multisigAccountPublicKey, NetworkType.MIJIN_TEST);

const cosignatoryToRemovePublicKey = process.env.COSIGNATORY_TO_REMOVE_PUBLIC_KEY as string;
const cosignatoryToRemove = PublicAccount.createFromPublicKey(cosignatoryToRemovePublicKey, NetworkType.MIJIN_TEST);

const cosignatoryPrivateKey = process.env.COSIGNATORY_PRIVATE_KEY as string;
const cosignatoryAccount =  Account.createFromPrivateKey(cosignatoryPrivateKey, NetworkType.MIJIN_TEST);

const multisigAccountModificationTransaction = MultisigAccountModificationTransaction.create(
    Deadline.create(),
    0,
    0,
    [],
    [cosignatoryToRemove],
    NetworkType.MIJIN_TEST);

const aggregateTransaction = AggregateTransaction.createComplete(
    Deadline.create(),
    [multisigAccountModificationTransaction.toAggregate(multisigAccount)],
    NetworkType.MIJIN_TEST,
    []);

const networkGenerationHash = process.env.NETWORK_GENERATION_HASH as string;
const signedTransaction = cosignatoryAccount.sign(aggregateTransaction, networkGenerationHash);

const transactionHttp = new TransactionHttp('http://localhost:3000');
transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
/* end block 01 */
