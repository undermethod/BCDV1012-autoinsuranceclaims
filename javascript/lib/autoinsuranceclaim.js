/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class AutoInsuranceClaim extends Contract {
  async initLedger(ctx) {
    console.info('============= START : Initialize Ledger ===========');
    const state = [
      {
        claimNum: 0,
        insuranceCompany: "",
        policyNumber: 0,
        vehicle: {
          make: "",
          model: "",
          year: 0,
          registrationNumber: 0,
          licensePlate: ""
        },
        accident: {
          driver: {
            wasRegisteredOwner: false,
            name: "",
            licenseNumber: 0
          },
          datetime: 0,
          location: "",
          injuries: "",
          numPassengersInvolved: 0,
          damage: "",
          otherDriversInvolved: [
            {
              name: "",
              licenseNumber: 0,
              insuranceCompany: "",
              policyNumber: 0
            }
          ],
          police: {
            wasReported: false,
            investigatingOfficer: {
              name: "",
              badgeNumber: 0
            }
          },
          description: ""
        },
        settlement: {
          isSettled: false,
          amount: 0,
          amountCoveredByInsurance: 0
        }
      }
    ];

    for (let i = 0; i < state.length; i++) {
      state[i].docType = 'claim';
      await ctx.stub.putState('CLAIM' + i, Buffer.from(JSON.stringify(state[i])));
      console.info('Added <--> ', state[i]);
    }
    console.info('============= END : Initialize Ledger ===========');
  }

  async queryClaim(ctx, _claimNum) {
    const claimAsBytes = await ctx.stub.getState(_claimNum);
    if (!claimAsBytes || claimAsBytes.length === 0) {
      throw new Error(`claim '${_claimNum}' does not exist`);
    }
    console.log(claimAsBytes.toString());
    return claimAsBytes.toString();
  }
  
  async addClaim(ctx,
    _insComp, _policyNum,
    _vehMake, _vehModel, _vehYr, _vehRegNum, _vehLicPlate,
    _drivWasRegdOwner, _drivName, _drivLicNum,
    _datetime, _location, _injuries, _numPassInvolved, _dmg, _drivInvolvedArr,
    _wasRpt, _officerName, _officerBadgeNum, _desc
  ) {
    console.info('============= START : Add Claim ===========');
    const state = await ctx.stub.getState(claim);
    const newClaim = {
      claimNum: state.length,
      insuranceCompany: _insComp,
      policyNumber: _policyNum,
      vehicle: {
        make: _vehMake,
        model: _vehModel,
        year: _vehYr,
        registrationNumber: _vehRegNum,
        licensePlate: _vehLicPlate
      },
      accident: {
        driver: {
          wasRegisteredOwner: _drivWasRegdOwner,
          name: _drivName,
          licenseNumber: _drivLicNum
        },
        datetime: _datetime,
        location: _location,
        injuries: _injuries,
        numPassengersInvolved: _numPassInvolved,
        damage: _dmg,
        otherDriversInvolved: _drivInvolvedArr,
        police: {
          wasReported: _wasRpt,
          investigatingOfficer: {
            name: _officerName,
            badgeNumber: _officerBadgeNum
          }
        },
        description: _desc
      },
      settlement: {
        isSettled: false,
        amount: 0,
        amountCoveredByInsurance: 0
      }
    };
    await ctx.stub.putState('CLAIM' + state.length, Buffer.from(JSON.stringify(newClaim)));
    console.info('============= END : Add Claim ===========');
  }
}

module.exports = AutoInsuranceClaim;
