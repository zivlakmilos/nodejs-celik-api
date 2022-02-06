const ffi = require('ffi-napi');
const ref = require('ref-napi');
const StructType = require('ref-struct-di')(ref);
const ArrayType = require('ref-array-di')(ref);

const constants = require('./constants');
const lpctstr = require('./lpctstr');
const BufferType = require('./BufferType');

const TYPE_INT = ref.types.int;
const TYPE_PINT = ref.refType(ref.types.int);
const TYPE_CHAR = ref.types.char;
const TYPE_CSTRING = ref.types.CString;
const TYPE_LPCTSTR = lpctstr;

const EID_DOCUMENT_DATA = StructType({
  docRegNo: BufferType(constants.EID_MAX_DocRegNo, 'utf-8'),
  docRegNoSize: ref.types.int,
  documentType: BufferType(constants.EID_MAX_DocumentType, 'utf-8'),
	documentTypeSize: TYPE_INT,
  issuingDate: BufferType(constants.EID_MAX_IssuingDate, 'utf-8'),
	issuingDateSize: TYPE_INT,
  expiryDate: BufferType(constants.EID_MAX_ExpiryDate, 'utf-8'),
  expiryDateSize: TYPE_INT,
  issuingAuthority: BufferType(constants.EID_MAX_IssuingAuthority, 'utf-8'),
	issuingAuthoritySize: TYPE_INT,
  documentSerialNumber: BufferType(constants.EID_MAX_DocumentSerialNumber, 'utf-8'),
	documentSerialNumberSize: TYPE_INT,
  chipSerialNumber: BufferType(constants.EID_MAX_ChipSerialNumber, 'utf-8'),
  chipSerialNumberSize: TYPE_INT,
});

const PEID_DOCUMENT_DATA = ref.refType(EID_DOCUMENT_DATA);

const EID_FIXED_PERSONAL_DATA = StructType({
	personalNumber: BufferType(constants.EID_MAX_PersonalNumber),
	personalNumberSize: TYPE_INT,
	surname: BufferType(constants.EID_MAX_Surname),
	surnameSize: TYPE_INT,
	givenName: BufferType(constants.EID_MAX_GivenName),
	givenNameSize: TYPE_INT,
	parentGivenName: BufferType(constants.EID_MAX_ParentGivenName),
	parentGivenNameSize: TYPE_INT,
	sex: BufferType(constants.EID_MAX_Sex),
	sexSize: TYPE_INT,
	placeOfBirth: BufferType(constants.EID_MAX_PlaceOfBirth),
	placeOfBirthSize: TYPE_INT,
	stateOfBirth: BufferType(constants.EID_MAX_StateOfBirth),
	stateOfBirthSize: TYPE_INT,
	dateOfBirth: BufferType(constants.EID_MAX_DateOfBirth),
	dateOfBirthSize: TYPE_INT,
	communityOfBirth: BufferType(constants.EID_MAX_CommunityOfBirth),
	communityOfBirthSize: TYPE_INT,
	statusOfForeigner: BufferType(constants.EID_MAX_StatusOfForeigner),
	statusOfForeignerSize: TYPE_INT,
	nationalityFull: BufferType(constants.EID_MAX_NationalityFull),
	nationalityFullSize: TYPE_INT,
});

const PEID_FIXED_PERSONAL_DATA = ref.refType(EID_FIXED_PERSONAL_DATA);

const loadCelik = (dllPath) => {
  const config = {
    EidStartup: [ TYPE_INT, [ TYPE_INT ] ],
    EidCleanup: [ TYPE_INT, [ ] ],
    //EidBeginRead(LPCSTR szReader, int* pnCardType = 0);
    EidBeginRead: [ TYPE_INT, [ TYPE_LPCTSTR, TYPE_PINT ] ],
    EidEndRead: [ TYPE_INT, [ ] ],
    EidReadDocumentData: [ TYPE_INT, [ PEID_DOCUMENT_DATA ] ],
    EidReadFixedPersonalData: [ TYPE_INT, [ PEID_FIXED_PERSONAL_DATA ] ],
    //EID_API int WINAPI EidReadFixedPersonalData(PEID_FIXED_PERSONAL_DATA pData);
    //EID_API int WINAPI EidReadVariablePersonalData(PEID_VARIABLE_PERSONAL_DATA pData);
    //EID_API int WINAPI EidReadPortrait(PEID_PORTRAIT pData);
  }

  return ffi.Library(dllPath, config);
}

module.exports.load = loadCelik;
module.exports.types = {
  TYPE_INT,
  TYPE_PINT,

  EID_DOCUMENT_DATA,
  PEID_DOCUMENT_DATA,
  EID_FIXED_PERSONAL_DATA,
  PEID_FIXED_PERSONAL_DATA,
}
