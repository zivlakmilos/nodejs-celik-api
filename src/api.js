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
  }

  cleanup = () => {
    const res = this.api.EidCleanup();
    console.log(`EidCleanup: ${res}`);
  }

  read = () => {
    const cardTypeBuf = ref.alloc(celik.types.TYPE_INT);

    const res = this.api.EidBeginRead('', cardTypeBuf);
    console.log(`EidBeginRead: ${res}`);

    const cardType = cardTypeBuf.deref()
    console.log(`    CardType: ${cardType}`);

    const documentData = this.readDocumentData();

    console.log(documentData);
  }

  readDocumentData = () => {
    const documentData = new celik.types.EID_DOCUMENT_DATA();
    const res = this.api.EidReadDocumentData(documentData.ref());
    console.log(`EidReadDocumentData: ${res}`);

    const data = {
      docRegNo: documentData.docRegNo.toString(),
      documentType: documentData.documentType.toString(),
      issuingDate: documentData.issuingDate.toString(),
      expiryDate: documentData.expiryDate.toString(),
      issuingAuthority: documentData.issuingAuthority.toString(),
      documentSerialNumber: documentData.documentSerialNumber.toString(),
      chipSerialNumber: documentData.chipSerialNumber.toString(),
    }

    return data;
  }

  readFixedPersonalData = () => {
  }

  readVariablePersonalData = () => {
  }

  readPortrait = () => {
  }
}

exports.CELIK_API_32_BIT = CELIK_API_32_BIT;
exports.CELIK_API_64_BIT = CELIK_API_64_BIT
exports.CelikAPI = CelikAPI;
