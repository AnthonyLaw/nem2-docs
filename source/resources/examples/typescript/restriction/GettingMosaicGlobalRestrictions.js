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
const restrictionHttp = new nem2_sdk_1.RestrictionMosaicHttp('http://localhost:3000');
restrictionHttp.getMosaicGlobalRestriction(mosaicId)
    .subscribe((mosaicGlobalRestrictions) => {
    if (mosaicGlobalRestrictions.restrictions.size > 0) {
        console.log('Key\t', 'Reference MosaicId\t', 'Restriction Type\t', 'Restriction Value');
        mosaicGlobalRestrictions.restrictions.forEach((value, key) => {
            console.log('\n' + key + '\t', value.referenceMosaicId.toHex() + '\t', nem2_sdk_1.MosaicRestrictionType[value.restrictionType] + '\t', value.restrictionValue);
        });
    }
    else {
        console.log('\n The mosaic does not have mosaic global restrictions assigned.');
    }
}, (err) => console.log(err));
/* end block 01 */
