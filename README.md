# BVDV1012 - dApp I
## HLF - Auto Insurance Claim

### State Machine
![Auto Insurance Claim State Diagram](https://github.com/undermethod/statediagrams/blob/main/AutoInsuranceClaim.png?raw=true)

### State Data
- Claim Number
- Insurance Company
- Policy Number
- Vehicle
  - Make
  - Model
  - Year
  - Registration Number
  - License Plate
- Accident
  - Driver
    - Is Registered Owner
    - Name
    - License Number
  - Datetime
  - Location
  - Injuries
  - Number of Passengers Involved
  - Damage
  - Description
  - Drivers Involved
    - Name
    - License Number
    - Insurance Company
    - Policy Number
  - Police
    - Reported
    - Officer
      - Name
      - Badge Number
- Settlement
  - Amount
  - Amount Covered by Insurance

### Transition Functions
- Start Claim
- Submit Claim
- Incomplete Claim
- Review Claim
- Reject Claim
- File Claim
- Claims Adjuster Does Not Require Form
- Claims Adjuster Requires Form
- Review Form
- Incomplete Form
- Form Complete

### Roles
- Driver
- Involved Driver
- Involved Passenger
- Witness
- Investigating Officer
- Insurer
- Claims Adjuster