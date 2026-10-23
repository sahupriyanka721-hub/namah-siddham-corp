import { useEffect } from 'react';
import { useSettings } from '../../context/SettingsContext';

const defaultKeywords = [
  'Namah Siddham Corporation Private Limited',
  'Namah Siddham',
  'CIN U77100MP2026PTC087531',
  'IT Services Bhopal',
  'Software Development Company Madhya Pradesh',
  'Website Development',
  'Custom Software Development',
  'ERP CRM Solutions',
  'Mobile Application Development',
  'Digital Marketing Agency',
  'SEO Services Bhopal',
  'Digital Products Ecosystem',
  'Online Marketplaces',
  'Aggregator Platforms India',
  'HomeServixo',
  'Carrento',
  'Jainamshree',
  'SuperiorMart',
  'Corporate Technology Holding',
  'Technology Solutions Provider',
].join(', ');

export const SeoMeta = ({ title, description, keywords, ogImage }) => {
  const { settings } = useSettings();

  useEffect(() => {
    // 1. Document Title
    const fullTitle = title
      ? `${title} | Namah Siddham Corporation Private Limited`
      : settings.seoDefaults?.metaTitle ||
        'Namah Siddham Corporation Private Limited — IT Services & Digital Products Ecosystem';
    document.title = fullTitle;

    // 2. Meta Description
    const metaDesc =
      description ||
      settings.seoDefaults?.metaDescription ||
      'Namah Siddham Corporation Private Limited combines IT expertise with a growing portfolio of digital platforms to help businesses establish their digital presence and connect customers, service providers, sellers, and partners. Registered in Bhopal, MP, India. CIN: U77100MP2026PTC087531.';

    let metaDescTag = document.querySelector('meta[name="description"]');
    if (!metaDescTag) {
      metaDescTag = document.createElement('meta');
      metaDescTag.setAttribute('name', 'description');
      document.head.appendChild(metaDescTag);
    }
    metaDescTag.setAttribute('content', metaDesc);

    // 3. Meta Keywords
    const pageKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;
    let metaKeywordsTag = document.querySelector('meta[name="keywords"]');
    if (!metaKeywordsTag) {
      metaKeywordsTag = document.createElement('meta');
      metaKeywordsTag.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywordsTag);
    }
    metaKeywordsTag.setAttribute('content', pageKeywords);

    // 4. OpenGraph Tags for Social Previews (WhatsApp, LinkedIn, Twitter, Facebook)
    const setOgTag = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setOgTag('og:title', fullTitle);
    setOgTag('og:description', metaDesc);
    setOgTag('og:type', 'website');
    setOgTag('og:site_name', 'Namah Siddham Corporation Private Limited');
    setOgTag('og:url', window.location.href);
    setOgTag('og:image', ogImage || `${window.location.origin}/assets/namah-siddham-emblem.svg`);

    // 5. Twitter Card Tags
    const setTwitterTag = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setTwitterTag('twitter:card', 'summary_large_image');
    setTwitterTag('twitter:title', fullTitle);
    setTwitterTag('twitter:description', metaDesc);
    setTwitterTag('twitter:image', ogImage || `${window.location.origin}/assets/namah-siddham-emblem.svg`);
  }, [title, description, keywords, ogImage, settings]);

  return null;
};

export default SeoMeta;