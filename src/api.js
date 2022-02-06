const ffi = require('ffi-napi');
const ref = require('ref-napi');
const upath = require('upath');

const celik = require('./celik');
const constants = require('./constants');

const CELIK_API_32_BIT = 'x86';
const CELIK_API_64_BIT = 'x64';

class CelikAPI {
  constructor(version = CELIK_API_64_BIT) {
    this.version = version;

    const dllPath = upath.normalize(`${__dirname}/../celik/${version}/CelikApi.dll`);
    this.api = celik.load(dllPath);
  }

  init = () => {
    const res = this.api.EidStartup(3);
    console.log(`EidStartup: ${res}`);

    return res === 0;
  }

  cleanup = () => {
    const res = this.api.EidCleanup();
    console.log(`EidCleanup: ${res}`);
  }

  read = () => {
    const cardTypeBuf = ref.alloc(celik.types.TYPE_INT);

    const res = this.api.EidBeginRead('', cardTypeBuf);
    console.log(`EidBeginRead: ${res}`);

    if (res != 0) {
      throw new Error(`Error code: ${res}`);
    }

    const cardType = cardTypeBuf.deref()
    console.log(`    CardType: ${cardType}`);

    const documentData = this.readDocumentData();
    const fixedPersonalData = this.readFixedPersonalData();
    const variablePersonalData = this.readVariablePersonalData();

    const data = {
      ...documentData,
      ...fixedPersonalData,
      ...variablePersonalData,
    }

    return data;
  }

  readDocumentData = () => {
    const documentData = new celik.types.EID_DOCUMENT_DATA();
    const res = this.api.EidReadDocumentData(documentData.ref());
    console.log(`EidReadDocumentData: ${res}`);

    if (res != 0) {
      throw new Error(`[EidReadDocumentData] Error code: ${res}`);
    }

    const data = {
      docRegNo: documentData.docRegNo.toString().replace(/\x00/g, ''),
      documentType: documentData.documentType.toString().replace(/\x00/g, ''),
      issuingDate: documentData.issuingDate.toString().replace(/\x00/g, ''),
      expiryDate: documentData.expiryDate.toString().replace(/\x00/g, ''),
      issuingAuthority: documentData.issuingAuthority.toString().replace(/\x00/g, ''),
      documentSerialNumber: documentData.documentSerialNumber.toString().replace(/\x00/g, ''),
      chipSerialNumber: documentData.chipSerialNumber.toString().replace(/\x00/g, ''),
    }

    return data;
  }

  readFixedPersonalData = () => {
    const fixedPersonalData = new celik.types.EID_FIXED_PERSONAL_DATA();
    const res = this.api.EidReadFixedPersonalData(fixedPersonalData.ref());
    console.log(`EidReadFixedPersonalData: ${res}`);

    if (res != 0) {
      throw new Error(`[EidReadFixedPersonalData] Error code: ${res}`);
    }

    const data = {
      personalNumber: fixedPersonalData.personalNumber.toString().replace(/\x00/g, ''),
      surname: fixedPersonalData.surname.toString().replace(/\x00/g, ''),
      givenName: fixedPersonalData.givenName.toString().replace(/\x00/g, ''),
      parentGivenName: fixedPersonalData.parentGivenName.toString().replace(/\x00/g, ''),
      sex: fixedPersonalData.sex.toString().replace(/\x00/g, ''),
      placeOfBirth: fixedPersonalData.placeOfBirth.toString().replace(/\x00/g, ''),
      stateOfBirth: fixedPersonalData.stateOfBirth.toString().replace(/\x00/g, ''),
      dateOfBirth: fixedPersonalData.dateOfBirth.toString().replace(/\x00/g, ''),
      communityOfBirth: fixedPersonalData.communityOfBirth.toString().replace(/\x00/g, ''),
      statusOfForeigner: fixedPersonalData.stateOfBirth.toString().replace(/\x00/g, ''),
      nationalityFull: fixedPersonalData.nationalityFull.toString().replace(/\x00/g, ''),
    }

    return data;
  }

  readVariablePersonalData = () => {
    const variablePersonalData = new celik.types.EID_VARIABLE_PERSONAL_DATA();
    const res = this.api.EidReadVariablePersonalData(variablePersonalData.ref());
    console.log(`EidReadVariablePersonalData: ${res}`);

    if (res != 0) {
      throw new Error(`[EidReadVariablePersonalData] Error code: ${res}`);
    }

    const data = {
      state: variablePersonalData.state.toString().replace(/\x00/g, ''),
      community: variablePersonalData.community.toString().replace(/\x00/g, ''),
      place: variablePersonalData.place.toString().replace(/\x00/g, ''),
      street: variablePersonalData.street.toString().replace(/\x00/g, ''),
      houseNumber: variablePersonalData.houseNumber.toString().replace(/\x00/g, ''),
      houseLetter: variablePersonalData.houseLetter.toString().replace(/\x00/g, ''),
      entrance: variablePersonalData.entrance.toString().replace(/\x00/g, ''),
      floor: variablePersonalData.floor.toString().replace(/\x00/g, ''),
      apartmentNumber: variablePersonalData.apartmentNumber.toString().replace(/\x00/g, ''),
      addressDate: variablePersonalData.addressDate.toString().replace(/\x00/g, ''),
      addressLabel: variablePersonalData.addressLabel.toString().replace(/\x00/g, ''),
    }

    return data;

  }

  readPortrait = () => {
  }
}

exports.CELIK_API_32_BIT = CELIK_API_32_BIT;
exports.CELIK_API_64_BIT = CELIK_API_64_BIT
exports.CelikAPI = CelikAPI;
