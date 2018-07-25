import antd_locale_en_GB from "antd/lib/locale-provider/en_GB";
import antd_locale_en_US from "antd/lib/locale-provider/en_US";
import antd_locale_es from "antd/lib/locale-provider/es_ES";
import antd_locale_pl from "antd/lib/locale-provider/pl_PL";
import antd_locale_ja from "antd/lib/locale-provider/ja_JP";

import locale_en from 'react-intl/locale-data/en';
import locale_es from 'react-intl/locale-data/es';
import locale_pl from 'react-intl/locale-data/pl';
import locale_ja from 'react-intl/locale-data/ja';
import locale_ms from 'react-intl/locale-data/ms';

export const antdLocales = {
    "en": antd_locale_en_US,
    "en-us": antd_locale_en_US,
    "en-au": antd_locale_en_GB,
    "en-ie": antd_locale_en_GB,
    "en-gb": antd_locale_en_GB,
    "es": antd_locale_es,
    "es-co": antd_locale_es,
    "pl": antd_locale_pl,
    "ja": antd_locale_ja,
};

export const intlLocales = [
    {...locale_en},
    {...locale_es},
    {...locale_pl},
    {...locale_ja},
    {...locale_ms}
];