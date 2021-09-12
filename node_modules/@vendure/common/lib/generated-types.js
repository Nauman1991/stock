"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageCode = exports.HistoryEntryType = exports.CurrencyCode = exports.LogicalOperator = exports.ErrorCode = exports.SortOrder = exports.Permission = exports.DeletionResult = exports.AdjustmentType = exports.GlobalFlag = exports.AssetType = exports.StockMovementType = exports.JobState = void 0;
/**
 * @description
 * The state of a Job in the JobQueue
 *
 * @docsCategory common
 */
var JobState;
(function (JobState) {
    JobState["PENDING"] = "PENDING";
    JobState["RUNNING"] = "RUNNING";
    JobState["COMPLETED"] = "COMPLETED";
    JobState["RETRYING"] = "RETRYING";
    JobState["FAILED"] = "FAILED";
    JobState["CANCELLED"] = "CANCELLED";
})(JobState = exports.JobState || (exports.JobState = {}));
var StockMovementType;
(function (StockMovementType) {
    StockMovementType["ADJUSTMENT"] = "ADJUSTMENT";
    StockMovementType["ALLOCATION"] = "ALLOCATION";
    StockMovementType["RELEASE"] = "RELEASE";
    StockMovementType["SALE"] = "SALE";
    StockMovementType["CANCELLATION"] = "CANCELLATION";
    StockMovementType["RETURN"] = "RETURN";
})(StockMovementType = exports.StockMovementType || (exports.StockMovementType = {}));
var AssetType;
(function (AssetType) {
    AssetType["IMAGE"] = "IMAGE";
    AssetType["VIDEO"] = "VIDEO";
    AssetType["BINARY"] = "BINARY";
})(AssetType = exports.AssetType || (exports.AssetType = {}));
var GlobalFlag;
(function (GlobalFlag) {
    GlobalFlag["TRUE"] = "TRUE";
    GlobalFlag["FALSE"] = "FALSE";
    GlobalFlag["INHERIT"] = "INHERIT";
})(GlobalFlag = exports.GlobalFlag || (exports.GlobalFlag = {}));
var AdjustmentType;
(function (AdjustmentType) {
    AdjustmentType["PROMOTION"] = "PROMOTION";
    AdjustmentType["DISTRIBUTED_ORDER_PROMOTION"] = "DISTRIBUTED_ORDER_PROMOTION";
})(AdjustmentType = exports.AdjustmentType || (exports.AdjustmentType = {}));
var DeletionResult;
(function (DeletionResult) {
    /** The entity was successfully deleted */
    DeletionResult["DELETED"] = "DELETED";
    /** Deletion did not take place, reason given in message */
    DeletionResult["NOT_DELETED"] = "NOT_DELETED";
})(DeletionResult = exports.DeletionResult || (exports.DeletionResult = {}));
/**
 * @description
 * Permissions for administrators and customers. Used to control access to
 * GraphQL resolvers via the {@link Allow} decorator.
 *
 * @docsCategory common
 */
var Permission;
(function (Permission) {
    /** Authenticated means simply that the user is logged in */
    Permission["Authenticated"] = "Authenticated";
    /** SuperAdmin has unrestricted access to all operations */
    Permission["SuperAdmin"] = "SuperAdmin";
    /** Owner means the user owns this entity, e.g. a Customer's own Order */
    Permission["Owner"] = "Owner";
    /** Public means any unauthenticated user may perform the operation */
    Permission["Public"] = "Public";
    /** Grants permission to update GlobalSettings */
    Permission["UpdateGlobalSettings"] = "UpdateGlobalSettings";
    /** Grants permission to create Products, Facets, Assets, Collections */
    Permission["CreateCatalog"] = "CreateCatalog";
    /** Grants permission to read Products, Facets, Assets, Collections */
    Permission["ReadCatalog"] = "ReadCatalog";
    /** Grants permission to update Products, Facets, Assets, Collections */
    Permission["UpdateCatalog"] = "UpdateCatalog";
    /** Grants permission to delete Products, Facets, Assets, Collections */
    Permission["DeleteCatalog"] = "DeleteCatalog";
    /** Grants permission to create PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
    Permission["CreateSettings"] = "CreateSettings";
    /** Grants permission to read PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
    Permission["ReadSettings"] = "ReadSettings";
    /** Grants permission to update PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
    Permission["UpdateSettings"] = "UpdateSettings";
    /** Grants permission to delete PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
    Permission["DeleteSettings"] = "DeleteSettings";
    /** Grants permission to create Administrator */
    Permission["CreateAdministrator"] = "CreateAdministrator";
    /** Grants permission to read Administrator */
    Permission["ReadAdministrator"] = "ReadAdministrator";
    /** Grants permission to update Administrator */
    Permission["UpdateAdministrator"] = "UpdateAdministrator";
    /** Grants permission to delete Administrator */
    Permission["DeleteAdministrator"] = "DeleteAdministrator";
    /** Grants permission to create Asset */
    Permission["CreateAsset"] = "CreateAsset";
    /** Grants permission to read Asset */
    Permission["ReadAsset"] = "ReadAsset";
    /** Grants permission to update Asset */
    Permission["UpdateAsset"] = "UpdateAsset";
    /** Grants permission to delete Asset */
    Permission["DeleteAsset"] = "DeleteAsset";
    /** Grants permission to create Channel */
    Permission["CreateChannel"] = "CreateChannel";
    /** Grants permission to read Channel */
    Permission["ReadChannel"] = "ReadChannel";
    /** Grants permission to update Channel */
    Permission["UpdateChannel"] = "UpdateChannel";
    /** Grants permission to delete Channel */
    Permission["DeleteChannel"] = "DeleteChannel";
    /** Grants permission to create Collection */
    Permission["CreateCollection"] = "CreateCollection";
    /** Grants permission to read Collection */
    Permission["ReadCollection"] = "ReadCollection";
    /** Grants permission to update Collection */
    Permission["UpdateCollection"] = "UpdateCollection";
    /** Grants permission to delete Collection */
    Permission["DeleteCollection"] = "DeleteCollection";
    /** Grants permission to create Country */
    Permission["CreateCountry"] = "CreateCountry";
    /** Grants permission to read Country */
    Permission["ReadCountry"] = "ReadCountry";
    /** Grants permission to update Country */
    Permission["UpdateCountry"] = "UpdateCountry";
    /** Grants permission to delete Country */
    Permission["DeleteCountry"] = "DeleteCountry";
    /** Grants permission to create Customer */
    Permission["CreateCustomer"] = "CreateCustomer";
    /** Grants permission to read Customer */
    Permission["ReadCustomer"] = "ReadCustomer";
    /** Grants permission to update Customer */
    Permission["UpdateCustomer"] = "UpdateCustomer";
    /** Grants permission to delete Customer */
    Permission["DeleteCustomer"] = "DeleteCustomer";
    /** Grants permission to create CustomerGroup */
    Permission["CreateCustomerGroup"] = "CreateCustomerGroup";
    /** Grants permission to read CustomerGroup */
    Permission["ReadCustomerGroup"] = "ReadCustomerGroup";
    /** Grants permission to update CustomerGroup */
    Permission["UpdateCustomerGroup"] = "UpdateCustomerGroup";
    /** Grants permission to delete CustomerGroup */
    Permission["DeleteCustomerGroup"] = "DeleteCustomerGroup";
    /** Grants permission to create Facet */
    Permission["CreateFacet"] = "CreateFacet";
    /** Grants permission to read Facet */
    Permission["ReadFacet"] = "ReadFacet";
    /** Grants permission to update Facet */
    Permission["UpdateFacet"] = "UpdateFacet";
    /** Grants permission to delete Facet */
    Permission["DeleteFacet"] = "DeleteFacet";
    /** Grants permission to create Order */
    Permission["CreateOrder"] = "CreateOrder";
    /** Grants permission to read Order */
    Permission["ReadOrder"] = "ReadOrder";
    /** Grants permission to update Order */
    Permission["UpdateOrder"] = "UpdateOrder";
    /** Grants permission to delete Order */
    Permission["DeleteOrder"] = "DeleteOrder";
    /** Grants permission to create PaymentMethod */
    Permission["CreatePaymentMethod"] = "CreatePaymentMethod";
    /** Grants permission to read PaymentMethod */
    Permission["ReadPaymentMethod"] = "ReadPaymentMethod";
    /** Grants permission to update PaymentMethod */
    Permission["UpdatePaymentMethod"] = "UpdatePaymentMethod";
    /** Grants permission to delete PaymentMethod */
    Permission["DeletePaymentMethod"] = "DeletePaymentMethod";
    /** Grants permission to create Product */
    Permission["CreateProduct"] = "CreateProduct";
    /** Grants permission to read Product */
    Permission["ReadProduct"] = "ReadProduct";
    /** Grants permission to update Product */
    Permission["UpdateProduct"] = "UpdateProduct";
    /** Grants permission to delete Product */
    Permission["DeleteProduct"] = "DeleteProduct";
    /** Grants permission to create Promotion */
    Permission["CreatePromotion"] = "CreatePromotion";
    /** Grants permission to read Promotion */
    Permission["ReadPromotion"] = "ReadPromotion";
    /** Grants permission to update Promotion */
    Permission["UpdatePromotion"] = "UpdatePromotion";
    /** Grants permission to delete Promotion */
    Permission["DeletePromotion"] = "DeletePromotion";
    /** Grants permission to create ShippingMethod */
    Permission["CreateShippingMethod"] = "CreateShippingMethod";
    /** Grants permission to read ShippingMethod */
    Permission["ReadShippingMethod"] = "ReadShippingMethod";
    /** Grants permission to update ShippingMethod */
    Permission["UpdateShippingMethod"] = "UpdateShippingMethod";
    /** Grants permission to delete ShippingMethod */
    Permission["DeleteShippingMethod"] = "DeleteShippingMethod";
    /** Grants permission to create Tag */
    Permission["CreateTag"] = "CreateTag";
    /** Grants permission to read Tag */
    Permission["ReadTag"] = "ReadTag";
    /** Grants permission to update Tag */
    Permission["UpdateTag"] = "UpdateTag";
    /** Grants permission to delete Tag */
    Permission["DeleteTag"] = "DeleteTag";
    /** Grants permission to create TaxCategory */
    Permission["CreateTaxCategory"] = "CreateTaxCategory";
    /** Grants permission to read TaxCategory */
    Permission["ReadTaxCategory"] = "ReadTaxCategory";
    /** Grants permission to update TaxCategory */
    Permission["UpdateTaxCategory"] = "UpdateTaxCategory";
    /** Grants permission to delete TaxCategory */
    Permission["DeleteTaxCategory"] = "DeleteTaxCategory";
    /** Grants permission to create TaxRate */
    Permission["CreateTaxRate"] = "CreateTaxRate";
    /** Grants permission to read TaxRate */
    Permission["ReadTaxRate"] = "ReadTaxRate";
    /** Grants permission to update TaxRate */
    Permission["UpdateTaxRate"] = "UpdateTaxRate";
    /** Grants permission to delete TaxRate */
    Permission["DeleteTaxRate"] = "DeleteTaxRate";
    /** Grants permission to create System */
    Permission["CreateSystem"] = "CreateSystem";
    /** Grants permission to read System */
    Permission["ReadSystem"] = "ReadSystem";
    /** Grants permission to update System */
    Permission["UpdateSystem"] = "UpdateSystem";
    /** Grants permission to delete System */
    Permission["DeleteSystem"] = "DeleteSystem";
    /** Grants permission to create Zone */
    Permission["CreateZone"] = "CreateZone";
    /** Grants permission to read Zone */
    Permission["ReadZone"] = "ReadZone";
    /** Grants permission to update Zone */
    Permission["UpdateZone"] = "UpdateZone";
    /** Grants permission to delete Zone */
    Permission["DeleteZone"] = "DeleteZone";
})(Permission = exports.Permission || (exports.Permission = {}));
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "ASC";
    SortOrder["DESC"] = "DESC";
})(SortOrder = exports.SortOrder || (exports.SortOrder = {}));
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
    ErrorCode["MIME_TYPE_ERROR"] = "MIME_TYPE_ERROR";
    ErrorCode["LANGUAGE_NOT_AVAILABLE_ERROR"] = "LANGUAGE_NOT_AVAILABLE_ERROR";
    ErrorCode["CHANNEL_DEFAULT_LANGUAGE_ERROR"] = "CHANNEL_DEFAULT_LANGUAGE_ERROR";
    ErrorCode["SETTLE_PAYMENT_ERROR"] = "SETTLE_PAYMENT_ERROR";
    ErrorCode["EMPTY_ORDER_LINE_SELECTION_ERROR"] = "EMPTY_ORDER_LINE_SELECTION_ERROR";
    ErrorCode["ITEMS_ALREADY_FULFILLED_ERROR"] = "ITEMS_ALREADY_FULFILLED_ERROR";
    ErrorCode["INVALID_FULFILLMENT_HANDLER_ERROR"] = "INVALID_FULFILLMENT_HANDLER_ERROR";
    ErrorCode["CREATE_FULFILLMENT_ERROR"] = "CREATE_FULFILLMENT_ERROR";
    ErrorCode["INSUFFICIENT_STOCK_ON_HAND_ERROR"] = "INSUFFICIENT_STOCK_ON_HAND_ERROR";
    ErrorCode["MULTIPLE_ORDER_ERROR"] = "MULTIPLE_ORDER_ERROR";
    ErrorCode["CANCEL_ACTIVE_ORDER_ERROR"] = "CANCEL_ACTIVE_ORDER_ERROR";
    ErrorCode["PAYMENT_ORDER_MISMATCH_ERROR"] = "PAYMENT_ORDER_MISMATCH_ERROR";
    ErrorCode["REFUND_ORDER_STATE_ERROR"] = "REFUND_ORDER_STATE_ERROR";
    ErrorCode["NOTHING_TO_REFUND_ERROR"] = "NOTHING_TO_REFUND_ERROR";
    ErrorCode["ALREADY_REFUNDED_ERROR"] = "ALREADY_REFUNDED_ERROR";
    ErrorCode["QUANTITY_TOO_GREAT_ERROR"] = "QUANTITY_TOO_GREAT_ERROR";
    ErrorCode["REFUND_STATE_TRANSITION_ERROR"] = "REFUND_STATE_TRANSITION_ERROR";
    ErrorCode["PAYMENT_STATE_TRANSITION_ERROR"] = "PAYMENT_STATE_TRANSITION_ERROR";
    ErrorCode["FULFILLMENT_STATE_TRANSITION_ERROR"] = "FULFILLMENT_STATE_TRANSITION_ERROR";
    ErrorCode["ORDER_MODIFICATION_STATE_ERROR"] = "ORDER_MODIFICATION_STATE_ERROR";
    ErrorCode["NO_CHANGES_SPECIFIED_ERROR"] = "NO_CHANGES_SPECIFIED_ERROR";
    ErrorCode["PAYMENT_METHOD_MISSING_ERROR"] = "PAYMENT_METHOD_MISSING_ERROR";
    ErrorCode["REFUND_PAYMENT_ID_MISSING_ERROR"] = "REFUND_PAYMENT_ID_MISSING_ERROR";
    ErrorCode["MANUAL_PAYMENT_STATE_ERROR"] = "MANUAL_PAYMENT_STATE_ERROR";
    ErrorCode["PRODUCT_OPTION_IN_USE_ERROR"] = "PRODUCT_OPTION_IN_USE_ERROR";
    ErrorCode["MISSING_CONDITIONS_ERROR"] = "MISSING_CONDITIONS_ERROR";
    ErrorCode["NATIVE_AUTH_STRATEGY_ERROR"] = "NATIVE_AUTH_STRATEGY_ERROR";
    ErrorCode["INVALID_CREDENTIALS_ERROR"] = "INVALID_CREDENTIALS_ERROR";
    ErrorCode["ORDER_STATE_TRANSITION_ERROR"] = "ORDER_STATE_TRANSITION_ERROR";
    ErrorCode["EMAIL_ADDRESS_CONFLICT_ERROR"] = "EMAIL_ADDRESS_CONFLICT_ERROR";
    ErrorCode["ORDER_LIMIT_ERROR"] = "ORDER_LIMIT_ERROR";
    ErrorCode["NEGATIVE_QUANTITY_ERROR"] = "NEGATIVE_QUANTITY_ERROR";
    ErrorCode["INSUFFICIENT_STOCK_ERROR"] = "INSUFFICIENT_STOCK_ERROR";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
var LogicalOperator;
(function (LogicalOperator) {
    LogicalOperator["AND"] = "AND";
    LogicalOperator["OR"] = "OR";
})(LogicalOperator = exports.LogicalOperator || (exports.LogicalOperator = {}));
/**
 * @description
 * ISO 4217 currency code
 *
 * @docsCategory common
 */
var CurrencyCode;
(function (CurrencyCode) {
    /** United Arab Emirates dirham */
    CurrencyCode["AED"] = "AED";
    /** Afghan afghani */
    CurrencyCode["AFN"] = "AFN";
    /** Albanian lek */
    CurrencyCode["ALL"] = "ALL";
    /** Armenian dram */
    CurrencyCode["AMD"] = "AMD";
    /** Netherlands Antillean guilder */
    CurrencyCode["ANG"] = "ANG";
    /** Angolan kwanza */
    CurrencyCode["AOA"] = "AOA";
    /** Argentine peso */
    CurrencyCode["ARS"] = "ARS";
    /** Australian dollar */
    CurrencyCode["AUD"] = "AUD";
    /** Aruban florin */
    CurrencyCode["AWG"] = "AWG";
    /** Azerbaijani manat */
    CurrencyCode["AZN"] = "AZN";
    /** Bosnia and Herzegovina convertible mark */
    CurrencyCode["BAM"] = "BAM";
    /** Barbados dollar */
    CurrencyCode["BBD"] = "BBD";
    /** Bangladeshi taka */
    CurrencyCode["BDT"] = "BDT";
    /** Bulgarian lev */
    CurrencyCode["BGN"] = "BGN";
    /** Bahraini dinar */
    CurrencyCode["BHD"] = "BHD";
    /** Burundian franc */
    CurrencyCode["BIF"] = "BIF";
    /** Bermudian dollar */
    CurrencyCode["BMD"] = "BMD";
    /** Brunei dollar */
    CurrencyCode["BND"] = "BND";
    /** Boliviano */
    CurrencyCode["BOB"] = "BOB";
    /** Brazilian real */
    CurrencyCode["BRL"] = "BRL";
    /** Bahamian dollar */
    CurrencyCode["BSD"] = "BSD";
    /** Bhutanese ngultrum */
    CurrencyCode["BTN"] = "BTN";
    /** Botswana pula */
    CurrencyCode["BWP"] = "BWP";
    /** Belarusian ruble */
    CurrencyCode["BYN"] = "BYN";
    /** Belize dollar */
    CurrencyCode["BZD"] = "BZD";
    /** Canadian dollar */
    CurrencyCode["CAD"] = "CAD";
    /** Congolese franc */
    CurrencyCode["CDF"] = "CDF";
    /** Swiss franc */
    CurrencyCode["CHF"] = "CHF";
    /** Chilean peso */
    CurrencyCode["CLP"] = "CLP";
    /** Renminbi (Chinese) yuan */
    CurrencyCode["CNY"] = "CNY";
    /** Colombian peso */
    CurrencyCode["COP"] = "COP";
    /** Costa Rican colon */
    CurrencyCode["CRC"] = "CRC";
    /** Cuban convertible peso */
    CurrencyCode["CUC"] = "CUC";
    /** Cuban peso */
    CurrencyCode["CUP"] = "CUP";
    /** Cape Verde escudo */
    CurrencyCode["CVE"] = "CVE";
    /** Czech koruna */
    CurrencyCode["CZK"] = "CZK";
    /** Djiboutian franc */
    CurrencyCode["DJF"] = "DJF";
    /** Danish krone */
    CurrencyCode["DKK"] = "DKK";
    /** Dominican peso */
    CurrencyCode["DOP"] = "DOP";
    /** Algerian dinar */
    CurrencyCode["DZD"] = "DZD";
    /** Egyptian pound */
    CurrencyCode["EGP"] = "EGP";
    /** Eritrean nakfa */
    CurrencyCode["ERN"] = "ERN";
    /** Ethiopian birr */
    CurrencyCode["ETB"] = "ETB";
    /** Euro */
    CurrencyCode["EUR"] = "EUR";
    /** Fiji dollar */
    CurrencyCode["FJD"] = "FJD";
    /** Falkland Islands pound */
    CurrencyCode["FKP"] = "FKP";
    /** Pound sterling */
    CurrencyCode["GBP"] = "GBP";
    /** Georgian lari */
    CurrencyCode["GEL"] = "GEL";
    /** Ghanaian cedi */
    CurrencyCode["GHS"] = "GHS";
    /** Gibraltar pound */
    CurrencyCode["GIP"] = "GIP";
    /** Gambian dalasi */
    CurrencyCode["GMD"] = "GMD";
    /** Guinean franc */
    CurrencyCode["GNF"] = "GNF";
    /** Guatemalan quetzal */
    CurrencyCode["GTQ"] = "GTQ";
    /** Guyanese dollar */
    CurrencyCode["GYD"] = "GYD";
    /** Hong Kong dollar */
    CurrencyCode["HKD"] = "HKD";
    /** Honduran lempira */
    CurrencyCode["HNL"] = "HNL";
    /** Croatian kuna */
    CurrencyCode["HRK"] = "HRK";
    /** Haitian gourde */
    CurrencyCode["HTG"] = "HTG";
    /** Hungarian forint */
    CurrencyCode["HUF"] = "HUF";
    /** Indonesian rupiah */
    CurrencyCode["IDR"] = "IDR";
    /** Israeli new shekel */
    CurrencyCode["ILS"] = "ILS";
    /** Indian rupee */
    CurrencyCode["INR"] = "INR";
    /** Iraqi dinar */
    CurrencyCode["IQD"] = "IQD";
    /** Iranian rial */
    CurrencyCode["IRR"] = "IRR";
    /** Icelandic króna */
    CurrencyCode["ISK"] = "ISK";
    /** Jamaican dollar */
    CurrencyCode["JMD"] = "JMD";
    /** Jordanian dinar */
    CurrencyCode["JOD"] = "JOD";
    /** Japanese yen */
    CurrencyCode["JPY"] = "JPY";
    /** Kenyan shilling */
    CurrencyCode["KES"] = "KES";
    /** Kyrgyzstani som */
    CurrencyCode["KGS"] = "KGS";
    /** Cambodian riel */
    CurrencyCode["KHR"] = "KHR";
    /** Comoro franc */
    CurrencyCode["KMF"] = "KMF";
    /** North Korean won */
    CurrencyCode["KPW"] = "KPW";
    /** South Korean won */
    CurrencyCode["KRW"] = "KRW";
    /** Kuwaiti dinar */
    CurrencyCode["KWD"] = "KWD";
    /** Cayman Islands dollar */
    CurrencyCode["KYD"] = "KYD";
    /** Kazakhstani tenge */
    CurrencyCode["KZT"] = "KZT";
    /** Lao kip */
    CurrencyCode["LAK"] = "LAK";
    /** Lebanese pound */
    CurrencyCode["LBP"] = "LBP";
    /** Sri Lankan rupee */
    CurrencyCode["LKR"] = "LKR";
    /** Liberian dollar */
    CurrencyCode["LRD"] = "LRD";
    /** Lesotho loti */
    CurrencyCode["LSL"] = "LSL";
    /** Libyan dinar */
    CurrencyCode["LYD"] = "LYD";
    /** Moroccan dirham */
    CurrencyCode["MAD"] = "MAD";
    /** Moldovan leu */
    CurrencyCode["MDL"] = "MDL";
    /** Malagasy ariary */
    CurrencyCode["MGA"] = "MGA";
    /** Macedonian denar */
    CurrencyCode["MKD"] = "MKD";
    /** Myanmar kyat */
    CurrencyCode["MMK"] = "MMK";
    /** Mongolian tögrög */
    CurrencyCode["MNT"] = "MNT";
    /** Macanese pataca */
    CurrencyCode["MOP"] = "MOP";
    /** Mauritanian ouguiya */
    CurrencyCode["MRU"] = "MRU";
    /** Mauritian rupee */
    CurrencyCode["MUR"] = "MUR";
    /** Maldivian rufiyaa */
    CurrencyCode["MVR"] = "MVR";
    /** Malawian kwacha */
    CurrencyCode["MWK"] = "MWK";
    /** Mexican peso */
    CurrencyCode["MXN"] = "MXN";
    /** Malaysian ringgit */
    CurrencyCode["MYR"] = "MYR";
    /** Mozambican metical */
    CurrencyCode["MZN"] = "MZN";
    /** Namibian dollar */
    CurrencyCode["NAD"] = "NAD";
    /** Nigerian naira */
    CurrencyCode["NGN"] = "NGN";
    /** Nicaraguan córdoba */
    CurrencyCode["NIO"] = "NIO";
    /** Norwegian krone */
    CurrencyCode["NOK"] = "NOK";
    /** Nepalese rupee */
    CurrencyCode["NPR"] = "NPR";
    /** New Zealand dollar */
    CurrencyCode["NZD"] = "NZD";
    /** Omani rial */
    CurrencyCode["OMR"] = "OMR";
    /** Panamanian balboa */
    CurrencyCode["PAB"] = "PAB";
    /** Peruvian sol */
    CurrencyCode["PEN"] = "PEN";
    /** Papua New Guinean kina */
    CurrencyCode["PGK"] = "PGK";
    /** Philippine peso */
    CurrencyCode["PHP"] = "PHP";
    /** Pakistani rupee */
    CurrencyCode["PKR"] = "PKR";
    /** Polish złoty */
    CurrencyCode["PLN"] = "PLN";
    /** Paraguayan guaraní */
    CurrencyCode["PYG"] = "PYG";
    /** Qatari riyal */
    CurrencyCode["QAR"] = "QAR";
    /** Romanian leu */
    CurrencyCode["RON"] = "RON";
    /** Serbian dinar */
    CurrencyCode["RSD"] = "RSD";
    /** Russian ruble */
    CurrencyCode["RUB"] = "RUB";
    /** Rwandan franc */
    CurrencyCode["RWF"] = "RWF";
    /** Saudi riyal */
    CurrencyCode["SAR"] = "SAR";
    /** Solomon Islands dollar */
    CurrencyCode["SBD"] = "SBD";
    /** Seychelles rupee */
    CurrencyCode["SCR"] = "SCR";
    /** Sudanese pound */
    CurrencyCode["SDG"] = "SDG";
    /** Swedish krona/kronor */
    CurrencyCode["SEK"] = "SEK";
    /** Singapore dollar */
    CurrencyCode["SGD"] = "SGD";
    /** Saint Helena pound */
    CurrencyCode["SHP"] = "SHP";
    /** Sierra Leonean leone */
    CurrencyCode["SLL"] = "SLL";
    /** Somali shilling */
    CurrencyCode["SOS"] = "SOS";
    /** Surinamese dollar */
    CurrencyCode["SRD"] = "SRD";
    /** South Sudanese pound */
    CurrencyCode["SSP"] = "SSP";
    /** São Tomé and Príncipe dobra */
    CurrencyCode["STN"] = "STN";
    /** Salvadoran colón */
    CurrencyCode["SVC"] = "SVC";
    /** Syrian pound */
    CurrencyCode["SYP"] = "SYP";
    /** Swazi lilangeni */
    CurrencyCode["SZL"] = "SZL";
    /** Thai baht */
    CurrencyCode["THB"] = "THB";
    /** Tajikistani somoni */
    CurrencyCode["TJS"] = "TJS";
    /** Turkmenistan manat */
    CurrencyCode["TMT"] = "TMT";
    /** Tunisian dinar */
    CurrencyCode["TND"] = "TND";
    /** Tongan paʻanga */
    CurrencyCode["TOP"] = "TOP";
    /** Turkish lira */
    CurrencyCode["TRY"] = "TRY";
    /** Trinidad and Tobago dollar */
    CurrencyCode["TTD"] = "TTD";
    /** New Taiwan dollar */
    CurrencyCode["TWD"] = "TWD";
    /** Tanzanian shilling */
    CurrencyCode["TZS"] = "TZS";
    /** Ukrainian hryvnia */
    CurrencyCode["UAH"] = "UAH";
    /** Ugandan shilling */
    CurrencyCode["UGX"] = "UGX";
    /** United States dollar */
    CurrencyCode["USD"] = "USD";
    /** Uruguayan peso */
    CurrencyCode["UYU"] = "UYU";
    /** Uzbekistan som */
    CurrencyCode["UZS"] = "UZS";
    /** Venezuelan bolívar soberano */
    CurrencyCode["VES"] = "VES";
    /** Vietnamese đồng */
    CurrencyCode["VND"] = "VND";
    /** Vanuatu vatu */
    CurrencyCode["VUV"] = "VUV";
    /** Samoan tala */
    CurrencyCode["WST"] = "WST";
    /** CFA franc BEAC */
    CurrencyCode["XAF"] = "XAF";
    /** East Caribbean dollar */
    CurrencyCode["XCD"] = "XCD";
    /** CFA franc BCEAO */
    CurrencyCode["XOF"] = "XOF";
    /** CFP franc (franc Pacifique) */
    CurrencyCode["XPF"] = "XPF";
    /** Yemeni rial */
    CurrencyCode["YER"] = "YER";
    /** South African rand */
    CurrencyCode["ZAR"] = "ZAR";
    /** Zambian kwacha */
    CurrencyCode["ZMW"] = "ZMW";
    /** Zimbabwean dollar */
    CurrencyCode["ZWL"] = "ZWL";
})(CurrencyCode = exports.CurrencyCode || (exports.CurrencyCode = {}));
var HistoryEntryType;
(function (HistoryEntryType) {
    HistoryEntryType["CUSTOMER_REGISTERED"] = "CUSTOMER_REGISTERED";
    HistoryEntryType["CUSTOMER_VERIFIED"] = "CUSTOMER_VERIFIED";
    HistoryEntryType["CUSTOMER_DETAIL_UPDATED"] = "CUSTOMER_DETAIL_UPDATED";
    HistoryEntryType["CUSTOMER_ADDED_TO_GROUP"] = "CUSTOMER_ADDED_TO_GROUP";
    HistoryEntryType["CUSTOMER_REMOVED_FROM_GROUP"] = "CUSTOMER_REMOVED_FROM_GROUP";
    HistoryEntryType["CUSTOMER_ADDRESS_CREATED"] = "CUSTOMER_ADDRESS_CREATED";
    HistoryEntryType["CUSTOMER_ADDRESS_UPDATED"] = "CUSTOMER_ADDRESS_UPDATED";
    HistoryEntryType["CUSTOMER_ADDRESS_DELETED"] = "CUSTOMER_ADDRESS_DELETED";
    HistoryEntryType["CUSTOMER_PASSWORD_UPDATED"] = "CUSTOMER_PASSWORD_UPDATED";
    HistoryEntryType["CUSTOMER_PASSWORD_RESET_REQUESTED"] = "CUSTOMER_PASSWORD_RESET_REQUESTED";
    HistoryEntryType["CUSTOMER_PASSWORD_RESET_VERIFIED"] = "CUSTOMER_PASSWORD_RESET_VERIFIED";
    HistoryEntryType["CUSTOMER_EMAIL_UPDATE_REQUESTED"] = "CUSTOMER_EMAIL_UPDATE_REQUESTED";
    HistoryEntryType["CUSTOMER_EMAIL_UPDATE_VERIFIED"] = "CUSTOMER_EMAIL_UPDATE_VERIFIED";
    HistoryEntryType["CUSTOMER_NOTE"] = "CUSTOMER_NOTE";
    HistoryEntryType["ORDER_STATE_TRANSITION"] = "ORDER_STATE_TRANSITION";
    HistoryEntryType["ORDER_PAYMENT_TRANSITION"] = "ORDER_PAYMENT_TRANSITION";
    HistoryEntryType["ORDER_FULFILLMENT"] = "ORDER_FULFILLMENT";
    HistoryEntryType["ORDER_CANCELLATION"] = "ORDER_CANCELLATION";
    HistoryEntryType["ORDER_REFUND_TRANSITION"] = "ORDER_REFUND_TRANSITION";
    HistoryEntryType["ORDER_FULFILLMENT_TRANSITION"] = "ORDER_FULFILLMENT_TRANSITION";
    HistoryEntryType["ORDER_NOTE"] = "ORDER_NOTE";
    HistoryEntryType["ORDER_COUPON_APPLIED"] = "ORDER_COUPON_APPLIED";
    HistoryEntryType["ORDER_COUPON_REMOVED"] = "ORDER_COUPON_REMOVED";
    HistoryEntryType["ORDER_MODIFIED"] = "ORDER_MODIFIED";
})(HistoryEntryType = exports.HistoryEntryType || (exports.HistoryEntryType = {}));
/**
 * @description
 * Languages in the form of a ISO 639-1 language code with optional
 * region or script modifier (e.g. de_AT). The selection available is based
 * on the [Unicode CLDR summary list](https://unicode-org.github.io/cldr-staging/charts/37/summary/root.html)
 * and includes the major spoken languages of the world and any widely-used variants.
 *
 * @docsCategory common
 */
var LanguageCode;
(function (LanguageCode) {
    /** Afrikaans */
    LanguageCode["af"] = "af";
    /** Akan */
    LanguageCode["ak"] = "ak";
    /** Albanian */
    LanguageCode["sq"] = "sq";
    /** Amharic */
    LanguageCode["am"] = "am";
    /** Arabic */
    LanguageCode["ar"] = "ar";
    /** Armenian */
    LanguageCode["hy"] = "hy";
    /** Assamese */
    LanguageCode["as"] = "as";
    /** Azerbaijani */
    LanguageCode["az"] = "az";
    /** Bambara */
    LanguageCode["bm"] = "bm";
    /** Bangla */
    LanguageCode["bn"] = "bn";
    /** Basque */
    LanguageCode["eu"] = "eu";
    /** Belarusian */
    LanguageCode["be"] = "be";
    /** Bosnian */
    LanguageCode["bs"] = "bs";
    /** Breton */
    LanguageCode["br"] = "br";
    /** Bulgarian */
    LanguageCode["bg"] = "bg";
    /** Burmese */
    LanguageCode["my"] = "my";
    /** Catalan */
    LanguageCode["ca"] = "ca";
    /** Chechen */
    LanguageCode["ce"] = "ce";
    /** Chinese */
    LanguageCode["zh"] = "zh";
    /** Simplified Chinese */
    LanguageCode["zh_Hans"] = "zh_Hans";
    /** Traditional Chinese */
    LanguageCode["zh_Hant"] = "zh_Hant";
    /** Church Slavic */
    LanguageCode["cu"] = "cu";
    /** Cornish */
    LanguageCode["kw"] = "kw";
    /** Corsican */
    LanguageCode["co"] = "co";
    /** Croatian */
    LanguageCode["hr"] = "hr";
    /** Czech */
    LanguageCode["cs"] = "cs";
    /** Danish */
    LanguageCode["da"] = "da";
    /** Dutch */
    LanguageCode["nl"] = "nl";
    /** Flemish */
    LanguageCode["nl_BE"] = "nl_BE";
    /** Dzongkha */
    LanguageCode["dz"] = "dz";
    /** English */
    LanguageCode["en"] = "en";
    /** Australian English */
    LanguageCode["en_AU"] = "en_AU";
    /** Canadian English */
    LanguageCode["en_CA"] = "en_CA";
    /** British English */
    LanguageCode["en_GB"] = "en_GB";
    /** American English */
    LanguageCode["en_US"] = "en_US";
    /** Esperanto */
    LanguageCode["eo"] = "eo";
    /** Estonian */
    LanguageCode["et"] = "et";
    /** Ewe */
    LanguageCode["ee"] = "ee";
    /** Faroese */
    LanguageCode["fo"] = "fo";
    /** Finnish */
    LanguageCode["fi"] = "fi";
    /** French */
    LanguageCode["fr"] = "fr";
    /** Canadian French */
    LanguageCode["fr_CA"] = "fr_CA";
    /** Swiss French */
    LanguageCode["fr_CH"] = "fr_CH";
    /** Fulah */
    LanguageCode["ff"] = "ff";
    /** Galician */
    LanguageCode["gl"] = "gl";
    /** Ganda */
    LanguageCode["lg"] = "lg";
    /** Georgian */
    LanguageCode["ka"] = "ka";
    /** German */
    LanguageCode["de"] = "de";
    /** Austrian German */
    LanguageCode["de_AT"] = "de_AT";
    /** Swiss High German */
    LanguageCode["de_CH"] = "de_CH";
    /** Greek */
    LanguageCode["el"] = "el";
    /** Gujarati */
    LanguageCode["gu"] = "gu";
    /** Haitian Creole */
    LanguageCode["ht"] = "ht";
    /** Hausa */
    LanguageCode["ha"] = "ha";
    /** Hebrew */
    LanguageCode["he"] = "he";
    /** Hindi */
    LanguageCode["hi"] = "hi";
    /** Hungarian */
    LanguageCode["hu"] = "hu";
    /** Icelandic */
    LanguageCode["is"] = "is";
    /** Igbo */
    LanguageCode["ig"] = "ig";
    /** Indonesian */
    LanguageCode["id"] = "id";
    /** Interlingua */
    LanguageCode["ia"] = "ia";
    /** Irish */
    LanguageCode["ga"] = "ga";
    /** Italian */
    LanguageCode["it"] = "it";
    /** Japanese */
    LanguageCode["ja"] = "ja";
    /** Javanese */
    LanguageCode["jv"] = "jv";
    /** Kalaallisut */
    LanguageCode["kl"] = "kl";
    /** Kannada */
    LanguageCode["kn"] = "kn";
    /** Kashmiri */
    LanguageCode["ks"] = "ks";
    /** Kazakh */
    LanguageCode["kk"] = "kk";
    /** Khmer */
    LanguageCode["km"] = "km";
    /** Kikuyu */
    LanguageCode["ki"] = "ki";
    /** Kinyarwanda */
    LanguageCode["rw"] = "rw";
    /** Korean */
    LanguageCode["ko"] = "ko";
    /** Kurdish */
    LanguageCode["ku"] = "ku";
    /** Kyrgyz */
    LanguageCode["ky"] = "ky";
    /** Lao */
    LanguageCode["lo"] = "lo";
    /** Latin */
    LanguageCode["la"] = "la";
    /** Latvian */
    LanguageCode["lv"] = "lv";
    /** Lingala */
    LanguageCode["ln"] = "ln";
    /** Lithuanian */
    LanguageCode["lt"] = "lt";
    /** Luba-Katanga */
    LanguageCode["lu"] = "lu";
    /** Luxembourgish */
    LanguageCode["lb"] = "lb";
    /** Macedonian */
    LanguageCode["mk"] = "mk";
    /** Malagasy */
    LanguageCode["mg"] = "mg";
    /** Malay */
    LanguageCode["ms"] = "ms";
    /** Malayalam */
    LanguageCode["ml"] = "ml";
    /** Maltese */
    LanguageCode["mt"] = "mt";
    /** Manx */
    LanguageCode["gv"] = "gv";
    /** Maori */
    LanguageCode["mi"] = "mi";
    /** Marathi */
    LanguageCode["mr"] = "mr";
    /** Mongolian */
    LanguageCode["mn"] = "mn";
    /** Nepali */
    LanguageCode["ne"] = "ne";
    /** North Ndebele */
    LanguageCode["nd"] = "nd";
    /** Northern Sami */
    LanguageCode["se"] = "se";
    /** Norwegian Bokmål */
    LanguageCode["nb"] = "nb";
    /** Norwegian Nynorsk */
    LanguageCode["nn"] = "nn";
    /** Nyanja */
    LanguageCode["ny"] = "ny";
    /** Odia */
    LanguageCode["or"] = "or";
    /** Oromo */
    LanguageCode["om"] = "om";
    /** Ossetic */
    LanguageCode["os"] = "os";
    /** Pashto */
    LanguageCode["ps"] = "ps";
    /** Persian */
    LanguageCode["fa"] = "fa";
    /** Dari */
    LanguageCode["fa_AF"] = "fa_AF";
    /** Polish */
    LanguageCode["pl"] = "pl";
    /** Portuguese */
    LanguageCode["pt"] = "pt";
    /** Brazilian Portuguese */
    LanguageCode["pt_BR"] = "pt_BR";
    /** European Portuguese */
    LanguageCode["pt_PT"] = "pt_PT";
    /** Punjabi */
    LanguageCode["pa"] = "pa";
    /** Quechua */
    LanguageCode["qu"] = "qu";
    /** Romanian */
    LanguageCode["ro"] = "ro";
    /** Moldavian */
    LanguageCode["ro_MD"] = "ro_MD";
    /** Romansh */
    LanguageCode["rm"] = "rm";
    /** Rundi */
    LanguageCode["rn"] = "rn";
    /** Russian */
    LanguageCode["ru"] = "ru";
    /** Samoan */
    LanguageCode["sm"] = "sm";
    /** Sango */
    LanguageCode["sg"] = "sg";
    /** Sanskrit */
    LanguageCode["sa"] = "sa";
    /** Scottish Gaelic */
    LanguageCode["gd"] = "gd";
    /** Serbian */
    LanguageCode["sr"] = "sr";
    /** Shona */
    LanguageCode["sn"] = "sn";
    /** Sichuan Yi */
    LanguageCode["ii"] = "ii";
    /** Sindhi */
    LanguageCode["sd"] = "sd";
    /** Sinhala */
    LanguageCode["si"] = "si";
    /** Slovak */
    LanguageCode["sk"] = "sk";
    /** Slovenian */
    LanguageCode["sl"] = "sl";
    /** Somali */
    LanguageCode["so"] = "so";
    /** Southern Sotho */
    LanguageCode["st"] = "st";
    /** Spanish */
    LanguageCode["es"] = "es";
    /** European Spanish */
    LanguageCode["es_ES"] = "es_ES";
    /** Mexican Spanish */
    LanguageCode["es_MX"] = "es_MX";
    /** Sundanese */
    LanguageCode["su"] = "su";
    /** Swahili */
    LanguageCode["sw"] = "sw";
    /** Congo Swahili */
    LanguageCode["sw_CD"] = "sw_CD";
    /** Swedish */
    LanguageCode["sv"] = "sv";
    /** Tajik */
    LanguageCode["tg"] = "tg";
    /** Tamil */
    LanguageCode["ta"] = "ta";
    /** Tatar */
    LanguageCode["tt"] = "tt";
    /** Telugu */
    LanguageCode["te"] = "te";
    /** Thai */
    LanguageCode["th"] = "th";
    /** Tibetan */
    LanguageCode["bo"] = "bo";
    /** Tigrinya */
    LanguageCode["ti"] = "ti";
    /** Tongan */
    LanguageCode["to"] = "to";
    /** Turkish */
    LanguageCode["tr"] = "tr";
    /** Turkmen */
    LanguageCode["tk"] = "tk";
    /** Ukrainian */
    LanguageCode["uk"] = "uk";
    /** Urdu */
    LanguageCode["ur"] = "ur";
    /** Uyghur */
    LanguageCode["ug"] = "ug";
    /** Uzbek */
    LanguageCode["uz"] = "uz";
    /** Vietnamese */
    LanguageCode["vi"] = "vi";
    /** Volapük */
    LanguageCode["vo"] = "vo";
    /** Welsh */
    LanguageCode["cy"] = "cy";
    /** Western Frisian */
    LanguageCode["fy"] = "fy";
    /** Wolof */
    LanguageCode["wo"] = "wo";
    /** Xhosa */
    LanguageCode["xh"] = "xh";
    /** Yiddish */
    LanguageCode["yi"] = "yi";
    /** Yoruba */
    LanguageCode["yo"] = "yo";
    /** Zulu */
    LanguageCode["zu"] = "zu";
})(LanguageCode = exports.LanguageCode || (exports.LanguageCode = {}));
//# sourceMappingURL=generated-types.js.map