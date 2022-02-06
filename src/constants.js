module.exports = {
  // Size of all UTF-8 and binary fields in bytes

  EID_MAX_DocRegNo : 9,
  EID_MAX_DocumentType : 2,
  EID_MAX_IssuingDate : 10,
  EID_MAX_ExpiryDate : 10,
  EID_MAX_IssuingAuthority : 100,
  EID_MAX_DocumentSerialNumber : 10,
  EID_MAX_ChipSerialNumber : 14,

  EID_MAX_PersonalNumber : 13,
  EID_MAX_Surname : 200,
  EID_MAX_GivenName : 200,
  EID_MAX_ParentGivenName : 200,
  EID_MAX_Sex : 2,
  EID_MAX_PlaceOfBirth : 200,
  EID_MAX_StateOfBirth : 200,
  EID_MAX_DateOfBirth : 10,
  EID_MAX_CommunityOfBirth : 200,
  EID_MAX_StatusOfForeigner : 200,
  EID_MAX_NationalityFull : 200,

  EID_MAX_State : 100,
  EID_MAX_Community : 200,
  EID_MAX_Place : 200,
  EID_MAX_Street : 200,
  EID_MAX_HouseNumber : 20,
  EID_MAX_HouseLetter : 8,
  EID_MAX_Entrance : 10,
  EID_MAX_Floor : 6,
  EID_MAX_ApartmentNumber : 12,
  EID_MAX_AddressDate : 10,
  EID_MAX_AddressLabel : 60,

  EID_MAX_Portrait : 7700,

  EID_MAX_Certificate : 2048,

  //
  // Card types, used in function EidBeginRead
  //

  EID_CARD_ID2008            : 1,
  EID_CARD_ID2014            : 2,
  EID_CARD_IF2020            : 3, // ID for foreigners

  //
  // Option identifiers, used in function EidSetOption
  //

  EID_O_KEEP_CARD_CLOSED     : 1,

  //
  // Certificate types, used in function EidReadCertificate
  //

  EID_Cert_MoiIntermediateCA : 1,
  EID_Cert_User1             : 2,
  EID_Cert_User2             : 3,

  //
  // Block types, used in function EidVerifySignature
  //

  EID_SIG_CARD               : 1,
  EID_SIG_FIXED              : 2,
  EID_SIG_VARIABLE           : 3,
  EID_SIG_PORTRAIT           : 4,

  // For new card version EidVerifySignature function will return EID_E_UNABLE_TO_EXECUTE for
  // parameter EID_SIG_PORTRAIT. Portrait is in new cards part of EID_SIG_FIXED. To determine
  // the card version use second parameter of function EidBeginRead

  //
  // Function return values
  //

  EID_OK                            :  0,
  EID_E_GENERAL_ERROR               : -1,
  EID_E_INVALID_PARAMETER           : -2,
  EID_E_VERSION_NOT_SUPPORTED       : -3,
  EID_E_NOT_INITIALIZED             : -4,
  EID_E_UNABLE_TO_EXECUTE           : -5,
  EID_E_READER_ERROR                : -6,
  EID_E_CARD_MISSING                : -7,
  EID_E_CARD_UNKNOWN                : -8,
  EID_E_CARD_MISMATCH               : -9,
  EID_E_UNABLE_TO_OPEN_SESSION      : -10,
  EID_E_DATA_MISSING                : -11,
  EID_E_CARD_SECFORMAT_CHECK_ERROR  : -12,
  EID_E_SECFORMAT_CHECK_CERT_ERROR  : -13,
  EID_E_INVALID_PASSWORD            : -14,
  EID_E_PIN_BLOCKED                 : -15,
}
