import React, { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import {
  Search, ArrowRight, LayoutGrid, Key, Hash, Activity, 
  Calendar, DollarSign, RefreshCw, Percent, Clock, GraduationCap, 
  Scissors, Minimize, Maximize, Smile, Film, Palette, Box, FileText, 
  FileSearch, Type, Volume2, Archive, Code, Terminal, Play, QrCode, User, 
  Database, Dices, Layers, Table, Binary, ChevronLeft, Star, Barcode as BarcodeIcon, Mail, Mic,
  FileImage, FileSpreadsheet, Presentation, FileWarning, FileType,
  Layout, Map as MapIcon, Shield, Gauge, Globe, ShieldAlert, List, Users,
  FileCode, Lock, Heart, Loader2, ShieldCheck, Scale
} from 'lucide-react';
import styles from './Dashboard.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import Contribute from './contribute/Contribute';
import About from './about/About';
import Home from './home/Home';
import NoSignups from './nosignups/NoSignups';
import AITools from './aitools/AITools';
import NoLoginApps from './nologinapps/NoLoginApps';
import IdesCodeEditorsAndDevelopmentEnvironmentsCategory from './development/ides-code-editors-and-development-environments/IdesCodeEditorsAndDevelopmentEnvironments';
import VersionControlAndCollaborationCategory from './development/version-control-and-collaboration/VersionControlAndCollaboration';
import BuildToolsPackageManagersAndDependencyManagementCategory from './development/build-tools-package-managers-and-dependency-management/BuildToolsPackageManagersAndDependencyManagement';
import ContainerizationVirtualizationAndInfrastructureAsCodeCategory from './development/containerization-virtualization-and-infrastructure-as-code/ContainerizationVirtualizationAndInfrastructureAsCode';
import TestingQualityAssuranceQaAndAutomationCategory from './development/testing-quality-assurance-qa-and-automation/TestingQualityAssuranceQaAndAutomation';
import ContinuousIntegrationContinuousDeploymentCicdCategory from './development/continuous-integration-continuous-deployment-cicd/ContinuousIntegrationContinuousDeploymentCicd';
import CloudPlatformsBackendAsAServiceBaasAndInfrastructureCategory from './development/cloud-platforms-backend-as-a-service-baa-s-and-infrastructure/CloudPlatformsBackendAsAServiceBaasAndInfrastructure';
import DatabaseManagementAndAnalyticsCategory from './development/database-management-and-analytics/DatabaseManagementAndAnalytics';
import ApiClientsDevelopmentAndTestingCategory from './development/api-clients-development-and-testing/ApiClientsDevelopmentAndTesting';
import AiassistedDevelopmentAgentsAndCopilotsCategory from './development/aiassisted-development-agents-and-copilots/AiassistedDevelopmentAgentsAndCopilots';
import MonitoringObservabilityAndLoggingCategory from './development/monitoring-observability-and-logging/MonitoringObservabilityAndLogging';
import ProjectManagementCollaborationAndTeamCommunicationCategory from './development/project-management-collaboration-and-team-communication/ProjectManagementCollaborationAndTeamCommunication';
import DocumentationCodeSearchAndLearningCategory from './development/documentation-code-search-and-learning/DocumentationCodeSearchAndLearning';
import DeveloperUtilitiesAndProductivityToolsCategory from './development/developer-utilities-and-productivity-tools/DeveloperUtilitiesAndProductivityTools';
import WebFrameworksAndLibrariesCategory from './development/web-frameworks-and-libraries/WebFrameworksAndLibraries';
import MobileDevelopmentAndCrossplatformToolsCategory from './development/mobile-development-and-cross-platform-tools/MobileDevelopmentAndCrossplatformTools';
import GameDevelopmentEnginesAndToolsCategory from './development/game-development-engines-and-tools/GameDevelopmentEnginesAndTools';
import DesignPrototypingAndCreativeToolsCategory from './development/design-prototyping-and-creative-tools/DesignPrototypingAndCreativeTools';
import DataScienceMachineLearningAndAiPlatformsCategory from './development/data-science-machine-learning-and-ai-platforms/DataScienceMachineLearningAndAiPlatforms';
import NocodeLowcodeDevelopmentPlatformsCategory from './development/no-code-low-code-development-platforms/NocodeLowcodeDevelopmentPlatforms';
import SecuritySecretsManagementAndAuthenticationCategory from './development/security-secrets-management-and-authentication/SecuritySecretsManagementAndAuthentication';
import CollaborationAndCommunicationCrossfunctionalCategory from './development/collaboration-and-communication-cross-functional/CollaborationAndCommunicationCrossfunctional';
import FeatureFlaggingAndExperimentationCategory from './development/feature-flagging-and-experimentation/FeatureFlaggingAndExperimentation';
import PlatformEngineeringAndInternalDeveloperPlatformsCategory from './development/platform-engineering-and-internal-developer-platforms/PlatformEngineeringAndInternalDeveloperPlatforms';

// No Sign-up category directories
import PrivacyCategory from './nosignups/privacy/Privacy';
import AICategory from './nosignups/ai/AI';
import VideoCategory from './nosignups/video/Video';
import AudioCategory from './nosignups/audio/Audio';
import GamingCategory from './nosignups/gaming/Gaming';
import ReadingCategory from './nosignups/reading/Reading';
import DownloadingCategory from './nosignups/downloading/Downloading';
import TorrentingCategory from './nosignups/torrenting/Torrenting';
import EducationalCategory from './nosignups/educational/Educational';
import MobileCategory from './nosignups/mobile/Mobile';
import LinuxMacOSCategory from './nosignups/linux-macos/LinuxMacOS';
import NonEnglishCategory from './nosignups/non-english/NonEnglish';
import MiscCategory from './nosignups/misc/Misc';
import LibrariesCategory from './nosignups/libraries/Libraries';
import Software from './software/Software';

const QRCodeGenerator = lazy(() => import('./code scanner&generator/qrcode generator/QRCodeGenerator'));
const QRCodeScanner = lazy(() => import('./code scanner&generator/qrcode scanner/QRCodeScanner'));
const WiFiQRCodeGenerator = lazy(() => import('./code scanner&generator/WiFi QR Code Generator/WiFiQRCodeGenerator'));
const VCardQRCodeGenerator = lazy(() => import('./code scanner&generator/vCard QR Code Generator/VCardQRCodeGenerator'));
const ImageUploadScanner = lazy(() => import('./code scanner&generator/Image Upload Scanner/ImageUploadScanner'));
const QRCodeValidator = lazy(() => import('./code scanner&generator/QR Code Validator/QRCodeValidator'));
const QRCodeCustomizer = lazy(() => import('./code scanner&generator/QR Code Customizer/QRCodeCustomizer'));
const QRCodeTracker = lazy(() => import('./code scanner&generator/QR Code Tracker/QRCodeTracker'));
const EmailSMSGenerator = lazy(() => import('./code scanner&generator/Email - SMS QR Generator/EmailSMSGenerator'));
const EventQRGenerator = lazy(() => import('./code scanner&generator/Event QR Code Generator (calendar events)/EventQRGenerator'));
const BulkQRGenerator = lazy(() => import('./code scanner&generator/Bulk QR Generator/BulkQRGenerator'));
const BarcodeGenerator = lazy(() => import('./code scanner&generator/barcode generator/BarcodeGenerator'));
const BarcodeScanner = lazy(() => import('./code scanner&generator/barcode scanner/BarcodeScanner'));
const BarcodeConverter = lazy(() => import('./code scanner&generator/Barcode Format Converter/BarcodeConverter'));
const BatchQRScanner = lazy(() => import('./code scanner&generator/Batch QR Scanner/BatchQRScanner'));
const DynamicQRGenerator = lazy(() => import('./code scanner&generator/Dynamic QR Code Generator/DynamicQRGenerator'));
const HistorySaver = lazy(() => import('./code scanner&generator/History Saver/HistorySaver'));

// Calculators
const AgeCalculator = lazy(() => import('./calculators/Age calculator/AgeCalculator'));
const BMICalculator = lazy(() => import('./calculators/BMI calculator/BMICalculator'));
const CurrencyConverter = lazy(() => import('./calculators/Currency converter/CurrencyConverter'));
const GPACalculator = lazy(() => import('./calculators/GPA calculator/GPACalculator'));
const LoanCalculator = lazy(() => import('./calculators/Loan calculator/LoanCalculator'));
const PercentageCalculator = lazy(() => import('./calculators/Percentage calculator/PercentageCalculator'));
const TimeZoneConverter = lazy(() => import('./calculators/Time zone converter/TimeZoneConverter'));

// Developer Tools
const JSONFormatter = lazy(() => import('./developer tools/JSON formatter & validator/JSONFormatter'));
const CodeBeautifier = lazy(() => import('./developer tools/Code beautifier/CodeBeautifier'));
const Minifier = lazy(() => import('./developer tools/HTML-CSS-JS minifier/Minifier'));
const APITester = lazy(() => import('./developer tools/API tester (basic)/APITester'));
const RegexTester = lazy(() => import('./developer tools/Regex tester/RegexTester'));

// Encoders & Decoders
const Base64Tools = lazy(() => import('./encoders&decoders/Base64 Encoder - Decoder/Base64Tools'));
const BinaryConverter = lazy(() => import('./encoders&decoders/Binary - Text Converter/BinaryConverter'));
const URLEncoder = lazy(() => import('./encoders&decoders/URL Encoder - Decoder/URLEncoder'));
const HTMLEntities = lazy(() => import('./encoders&decoders/HTML Encoder - Decoder/HTMLEntities'));
const MorseTranslator = lazy(() => import('./encoders&decoders/Morse Code Translator/MorseTranslator'));

// File & Document Tools
const PDFTools = lazy(() => import('./file&document tools/PDF merger & splitter/PDFTools'));
const OCRTool = lazy(() => import('./file&document tools/OCR (Image - Text)/OCRTool'));
const ZIPTool = lazy(() => import('./file&document tools/File compressor (ZIP, RAR)/ZIPTool'));
const TTSTool = lazy(() => import('./file&document tools/Text to speech/TTSTool'));
const STTTool = lazy(() => import('./file&document tools/Speech to text/STTTool'));
const ImageToPDF = lazy(() => import('./file&document tools/Image to PDF/ImageToPDF'));

// Document Conversion Tools
const WordToPDF = lazy(() => import('./file&document tools/documents/word to pdf/WordToPDF'));
const WordToTXT = lazy(() => import('./file&document tools/documents/word to txt/WordToTXT'));
const ExcelToPDF = lazy(() => import('./file&document tools/documents/excel to pdf/ExcelToPDF'));
const ExcelToWord = lazy(() => import('./file&document tools/documents/excel to word/ExcelToWord'));
const PDFToImage = lazy(() => import('./file&document tools/documents/pdf to image/PDFToImage'));
const PDFToWord = lazy(() => import('./file&document tools/documents/pdf to word/PDFToWord'));
const PDFToExcel = lazy(() => import('./file&document tools/documents/pdf to excel/PDFToExcel'));
const PDFToPowerPoint = lazy(() => import('./file&document tools/documents/pdf to powerpoint/PDFToPowerPoint'));
const PowerPointToPDF = lazy(() => import('./file&document tools/documents/powerpoint to pdf/PowerPointToPDF'));
const UniversalDocTool = lazy(() => import('./file&document tools/documents/UniversalDocTool'));

// SEO & Website Tools
const KeywordChecker = lazy(() => import('./SEO & Website tools/Keyword density checker/KeywordChecker'));
const MetaGenerator = lazy(() => import('./SEO & Website tools/Meta tag generator/MetaGenerator'));
const SitemapGenerator = lazy(() => import('./SEO & Website tools/Sitemap generator/SitemapGenerator'));
const RobotsGenerator = lazy(() => import('./SEO & Website tools/Robots.txt generator/RobotsGenerator'));
const SpeedChecker = lazy(() => import('./SEO & Website tools/Website speed checker/SpeedChecker'));
const WhoisLookup = lazy(() => import('./SEO & Website tools/Domain WHOIS lookup/WhoisLookup'));

// Security Tools
const HashGenerator = lazy(() => import('./security/Hash generator (MD5, SHA)/HashGenerator'));
const PasswordGenerator = lazy(() => import('./security/Password generator/PasswordGenerator'));
const StrengthChecker = lazy(() => import('./security/Password strength checker/StrengthChecker'));
const IPLookup = lazy(() => import('./security/IP lookup/IPLookup'));
const VPNCheck = lazy(() => import('./security/VPN check tool/VPNCheck'));

// Miscellaneous Tools
const DiceGenerator = lazy(() => import('./miscellaneous/Dice-number generator/DiceGenerator'));
const FakeDataGenerator = lazy(() => import('./miscellaneous/Fake data generator (for testing)/FakeDataGenerator'));
const NameGenerator = lazy(() => import('./miscellaneous/Random name generator/NameGenerator'));
const PasswordList = lazy(() => import('./miscellaneous/Random password list/PasswordList'));
const CaseConverter = lazy(() => import('./miscellaneous/Text case converter (UPPERCASE-lowercase)/CaseConverter'));

// Image & Design Tools
const ImageCompressor = lazy(() => import('./imagedesign tools/Image compressor/ImageCompressor'));
const ColorPicker = lazy(() => import('./imagedesign tools/Color picker/ColorPicker'));
const FaviconGenerator = lazy(() => import('./imagedesign tools/Favicon generator/FaviconGenerator'));
const ImageResizer = lazy(() => import('./imagedesign tools/Image resizer/ImageResizer'));
const BackgroundRemover = lazy(() => import('./imagedesign tools/Background remover/BackgroundRemover'));
const LogoGenerator = lazy(() => import('./imagedesign tools/Logo generator/LogoGenerator'));
const MemeGenerator = lazy(() => import('./imagedesign tools/Meme generator/MemeGenerator'));
const ThumbnailMaker = lazy(() => import('./imagedesign tools/Thumbnail maker/ThumbnailMaker'));

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: ToolCategory;
  featured?: boolean;
}

type ToolCategory = 
  | 'All' 
  | 'Security' 
  | 'Calculators' 
  | 'Image & Design' 
  | 'File & Document' 
  | 'Developer' 
  | 'Miscellaneous' 
  | 'Scanner & Generator' 
  | 'Encoders & Decoders'
  | 'SEO & Website tools';

// Helper components for custom icons
const BracesIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 3 4 4-4 4"/><path d="m8 21-4-4 4-4"/><path d="M15 12h-2"/><path d="M11 12H9"/></svg>
);

const LinkIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
);

const CATEGORIES: ToolCategory[] = [
  'All', 'Security', 'Calculators', 'Image & Design', 
  'File & Document', 'Developer', 'Scanner & Generator', 
  'Encoders & Decoders', 'Miscellaneous', 'SEO & Website tools'
];

const TOOLS: Tool[] = [
  // Security
  { id: 'pass-gen', name: 'Password Generator', description: 'Create ultra-secure random passwords.', icon: <Lock size={24} />, category: 'Security', featured: true },
  { id: 'pass-strength', name: 'Strength Checker', description: 'Analyze password complexity & entropy.', icon: <Key size={24} />, category: 'Security' },
  { id: 'hash-gen', name: 'Hash Generator', description: 'MD5, SHA-1, SHA-256 cryptographic hashes.', icon: <Shield size={24} />, category: 'Security', featured: true },
  { id: 'ip-lookup', name: 'IP Lookup', description: 'Geolocate and analyze any IP address.', icon: <Globe size={24} />, category: 'Security' },
  { id: 'vpn-check', name: 'VPN detector', description: 'Detect if an IP belongs to a VPN or Proxy.', icon: <ShieldAlert size={24} />, category: 'Security' },

  // Calculators
  { id: 'age-calc', name: 'Age Calculator', description: 'Precise age calculation including minutes.', icon: <Calendar size={24} />, category: 'Calculators' },
  { id: 'bmi-calc', name: 'BMI Calculator', description: 'Calculate Body Mass Index instantly.', icon: <Activity size={24} />, category: 'Calculators' },
  { id: 'loan-calc', name: 'Loan Calculator', description: 'Calculate monthly payments & interest.', icon: <DollarSign size={24} />, category: 'Calculators', featured: true },
  { id: 'currency-conv', name: 'Currency Converter', description: 'Real-time exchange rates for global currencies.', icon: <RefreshCw size={24} />, category: 'Calculators' },
  { id: 'percent-calc', name: 'Percentage Calc', description: 'Simple & complex percentage operations.', icon: <Percent size={24} />, category: 'Calculators' },
  { id: 'timezone-conv', name: 'Time Zone Converter', description: 'Sync times across multiple global zones.', icon: <Clock size={24} />, category: 'Calculators' },
  { id: 'gpa-calc', name: 'GPA Calculator', description: 'Calculate academic performance scores.', icon: <GraduationCap size={24} />, category: 'Calculators' },

  // Image & Design
  { id: 'bg-remover', name: 'Background Remover', description: 'AI-powered background extraction.', icon: <Scissors size={24} />, category: 'Image & Design', featured: true },
  { id: 'img-compress', name: 'Image Compressor', description: 'Reduce file size without losing quality.', icon: <Minimize size={24} />, category: 'Image & Design' },
  { id: 'img-resizer', name: 'Image Resizer', description: 'Change dimensions for any platform.', icon: <Maximize size={24} />, category: 'Image & Design' },
  { id: 'meme-gen', name: 'Meme Generator', description: 'Create viral memes from templates.', icon: <Smile size={24} />, category: 'Image & Design' },
  { id: 'thumb-maker', name: 'Thumbnail Maker', description: 'Designing high-clickrate thumbnails.', icon: <Film size={24} />, category: 'Image & Design' },
  { id: 'color-picker', name: 'Color Picker', description: 'HEX, RGB, HSL converter & picker.', icon: <Palette size={24} />, category: 'Image & Design' },
  { id: 'logo-gen', name: 'Logo Generator', description: 'Quick AI logo concepts for projects.', icon: <Box size={24} />, category: 'Image & Design' },
  { id: 'favicon-gen', name: 'Favicon Generator', description: 'Generate favicons for websites.', icon: <FileCode size={24} />, category: 'Image & Design' },

  // File & Document
  { id: 'pdf-merge', name: 'PDF Merger & Splitter', description: 'Combine or extract pages from PDFs.', icon: <FileText size={24} />, category: 'File & Document', featured: true },
  { id: 'img-to-pdf', name: 'Image to PDF', description: 'Convert collections of images to PDF.', icon: <FileSearch size={24} />, category: 'File & Document' },
  { id: 'ocr-text', name: 'OCR (Image to Text)', description: 'Extract text from images using AI.', icon: <Type size={24} />, category: 'File & Document' },
  { id: 'tts-tool', name: 'Text to Speech', description: 'Convert written text to natural audio.', icon: <Volume2 size={24} />, category: 'File & Document' },
  { id: 'stt-tool', name: 'Speech to Text', description: 'Transcribe voice into editable text.', icon: <Mic size={24} />, category: 'File & Document' },
  { id: 'file-compress', name: 'ZIP Compressor', description: 'ZIP archives management.', icon: <Archive size={24} />, category: 'File & Document' },
  { id: 'word-to-pdf', name: 'Word to PDF', description: 'Convert .docx to PDF document.', icon: <FileText size={24} />, category: 'File & Document' },
  { id: 'word-to-txt', name: 'Word to TXT', description: 'Extract plain text from Word.', icon: <FileType size={24} />, category: 'File & Document' },
  { id: 'excel-to-pdf', name: 'Excel to PDF', description: 'Convert spreadsheets to PDF.', icon: <FileSpreadsheet size={24} />, category: 'File & Document' },
  { id: 'excel-to-word', name: 'Excel to Word', description: 'Convert tables to Word document.', icon: <FileText size={24} />, category: 'File & Document' },
  { id: 'pdf-to-image', name: 'PDF to Image', description: 'Convert PDF pages to PNG images.', icon: <FileImage size={24} />, category: 'File & Document' },
  { id: 'pdf-to-word', name: 'PDF to Word', description: 'Convert PDF content to editable Word.', icon: <FileText size={24} />, category: 'File & Document' },
  { id: 'pdf-to-excel', name: 'PDF to Excel', description: 'Extract PDF tables to Excel.', icon: <FileSpreadsheet size={24} />, category: 'File & Document' },
  { id: 'pdf-to-ppt', name: 'PDF to PowerPoint', description: 'Convert PDF pages to Slides.', icon: <Presentation size={24} />, category: 'File & Document' },
  { id: 'ppt-to-pdf', name: 'PowerPoint to PDF', description: 'Convert .pptx to PDF document.', icon: <Presentation size={24} />, category: 'File & Document' },
  { id: 'pub-to-pdf', name: 'Publisher to PDF', description: 'Convert .pub files to PDF.', icon: <FileWarning size={24} />, category: 'File & Document' },
  { id: 'pdf-to-pub', name: 'PDF to Publisher', description: 'Convert PDF to Publisher format.', icon: <FileWarning size={24} />, category: 'File & Document' },

  // SEO & Website Tools
  { id: 'keyword-checker', name: 'Keyword Density', description: 'Analyze keyword frequency in content.', icon: <Type size={24} />, category: 'SEO & Website tools', featured: true },
  { id: 'meta-gen', name: 'Meta Tag Generator', description: 'Generate SEO meta tags for sites.', icon: <Layout size={24} />, category: 'SEO & Website tools' },
  { id: 'sitemap-gen', name: 'Sitemap Generator', description: 'Create XML sitemaps for indexing.', icon: <MapIcon size={24} />, category: 'SEO & Website tools' },
  { id: 'robots-gen', name: 'Robots.txt Generator', description: 'Configure crawler access rules.', icon: <Shield size={24} />, category: 'SEO & Website tools' },
  { id: 'speed-checker', name: 'Website Speed', description: 'Check site performance metrics.', icon: <Gauge size={24} />, category: 'SEO & Website tools' },
  { id: 'whois-lookup', name: 'WHOIS Lookup', description: 'Domain registration info lookup.', icon: <Globe size={24} />, category: 'SEO & Website tools' },

  // Developer Tools
  { id: 'json-format', name: 'JSON Formatter', description: 'Clean & validate messy JSON code.', icon: <Code size={24} />, category: 'Developer', featured: true },
  { id: 'code-minifier', name: 'Code Minifier', description: 'Compress HTML, CSS, and JS files.', icon: <Terminal size={24} />, category: 'Developer' },
  { id: 'code-beautifier', name: 'Code Beautifier', description: 'Auto-format code for readability.', icon: <BracesIcon size={24} />, category: 'Developer' },
  { id: 'regex-tester', name: 'Regex Tester', description: 'Test & debug regular expressions.', icon: <Hash size={24} />, category: 'Developer' },
  { id: 'api-tester', name: 'API Tester', description: 'Basic REST API testing tool.', icon: <Play size={24} />, category: 'Developer' },

  // Scanner & Generator
  { id: 'qr-gen', name: 'QR Code Generator', description: 'Create dynamic & custom QR codes.', icon: <QrCode size={24} />, category: 'Scanner & Generator', featured: true },
  { id: 'qr-scan', name: 'QR Code Scanner', description: 'Scan QR codes from camera or file.', icon: <Maximize size={24} />, category: 'Scanner & Generator' },
  { id: 'batch-qr-scan', name: 'Batch QR Scanner', description: 'Scan multiple codes for inventory.', icon: <Layers size={24} />, category: 'Scanner & Generator' },
  { id: 'barcode-gen', name: 'Barcode Generator', description: 'EAN, UPC, Code-128 & more.', icon: <BarcodeIcon size={24} />, category: 'Scanner & Generator' },
  { id: 'barcode-scan', name: 'Barcode Scanner', description: 'Dedicated 1D barcode reader.', icon: <Box size={24} />, category: 'Scanner & Generator' },
  { id: 'qr-wifi', name: 'WiFi QR Code', description: 'Create QR for WiFi networks.', icon: <QrCode size={24} />, category: 'Scanner & Generator' },
  { id: 'vcard-qr', name: 'vCard QR Gen', description: 'Share contact details instantly.', icon: <User size={24} />, category: 'Scanner & Generator' },
  { id: 'email-qr', name: 'Email/SMS QR', description: 'Pre-filled messages via QR codes.', icon: <Mail size={24} />, category: 'Scanner & Generator' },
  { id: 'event-qr', name: 'Event QR Gen', description: 'Add events to phone calendars.', icon: <Calendar size={24} />, category: 'Scanner & Generator' },
  { id: 'bulk-qr', name: 'Bulk QR Gen', description: 'Generate from CSV data upload.', icon: <Table size={24} />, category: 'Scanner & Generator' },
  { id: 'barcode-conv', name: 'Barcode Converter', description: 'EAN vs UPC checksum conversion.', icon: <RefreshCw size={24} />, category: 'Scanner & Generator' },
  { id: 'dynamic-qr', name: 'Editable QR Hub', description: 'Managed links & local redirects.', icon: <RefreshCw size={24} />, category: 'Scanner & Generator' },
  { id: 'hist-save', name: 'History Saver', description: 'Manage and archive your scan logs.', icon: <Archive size={24} />, category: 'Scanner & Generator' },
  { id: 'qr-custom', name: 'QR Customizer', description: 'Branding, logos & premium themes.', icon: <Palette size={24} />, category: 'Scanner & Generator' },
  { id: 'qr-valid', name: 'QR Validator', description: 'Technical analysis & grading.', icon: <Shield size={24} />, category: 'Scanner & Generator' },
  { id: 'qr-track', name: 'QR Tracker', description: 'Local scan frequency analytics.', icon: <Activity size={24} />, category: 'Scanner & Generator' },
  { id: 'img-scan', name: 'Image Scanner', description: 'Scan QR codes from saved files.', icon: <FileSearch size={24} />, category: 'Scanner & Generator' },

  // Encoders & Decoders
  { id: 'b64-enc', name: 'Base64 Encoder', description: 'Encode/Decode Base64 strings.', icon: <Binary size={24} />, category: 'Encoders & Decoders' },
  { id: 'binary-conv', name: 'Binary Converter', description: 'Convert text to 0/1 binary sequences.', icon: <Binary size={24} />, category: 'Encoders & Decoders' },
  { id: 'url-enc', name: 'URL Encoder', description: 'Safe URL encoding and decoding.', icon: <LinkIcon size={24} />, category: 'Encoders & Decoders' },
  { id: 'morse-conv', name: 'Morse Translator', description: 'Text to Morse code conversion.', icon: <Volume2 size={24} />, category: 'Encoders & Decoders' },
  { id: 'html-enc', name: 'HTML Encoder', description: 'Safe HTML character escaping.', icon: <Code size={24} />, category: 'Encoders & Decoders' },

  // Miscellaneous
  { id: 'dice-gen', name: 'Dice Generator', description: 'Random number & dice roller.', icon: <Dices size={24} />, category: 'Miscellaneous', featured: true },
  { id: 'fake-data', name: 'Fake Data Gen', description: 'Mock data for testing & dev.', icon: <Database size={24} />, category: 'Miscellaneous' },
  { id: 'name-gen', name: 'Name Generator', description: 'Random realistic name maker.', icon: <Users size={24} />, category: 'Miscellaneous' },
  { id: 'pass-list', name: 'Password List', description: 'Bulk secure password generator.', icon: <List size={24} />, category: 'Miscellaneous' },
  { id: 'case-conv', name: 'Case Converter', description: 'UPPER, lower, camel, snake converter.', icon: <Type size={24} />, category: 'Miscellaneous' }
];

// Category colors helper mapping
const CATEGORY_COLORS: Record<string, string> = {
  'Security': 'security',
  'Calculators': 'calculators',
  'Image & Design': 'image',
  'File & Document': 'file',
  'SEO & Website tools': 'seo',
  'Developer': 'developer',
  'Scanner & Generator': 'scanner',
  'Encoders & Decoders': 'encoder',
  'Miscellaneous': 'misc'
};

interface DashboardProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedToolId: string | null;
  setSelectedToolId: (id: string | null) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ activeTab, setActiveTab, selectedToolId, setSelectedToolId, searchValue, onSearchChange }) => {
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('All');
  const [activeSection, setActiveSection] = useState<string>('');
  const [history, setHistory] = useState<string[]>(() => 
    JSON.parse(localStorage.getItem('mrbit_history') || '[]')
  );

  // Update history logs on tool selection
  useEffect(() => {
    if (selectedToolId) {
      setHistory(prev => {
        const next = [selectedToolId, ...prev.filter(id => id !== selectedToolId)].slice(0, 24);
        localStorage.setItem('mrbit_history', JSON.stringify(next));
        return next;
      });
    }
  }, [selectedToolId]);

  useEffect(() => {
    if (activeTab !== 'Privacy' && activeTab !== 'Terms') return;

    // Set initial section
    if (activeTab === 'Privacy') {
      setActiveSection('scope');
    } else if (activeTab === 'Terms') {
      setActiveSection('agreement');
    }

    const sectionIds = activeTab === 'Privacy'
      ? ['scope', 'local-first', 'isolation', 'storage', 'libraries', 'rights', 'network', 'children', 'updates', 'contact']
      : ['agreement', 'ownership', 'license', 'conduct', 'dependencies', 'warranties', 'liability', 'dmca', 'law', 'mods'];

    const handleScroll = () => {
      const headerHeight = 160; // Offset threshold for header and page header
      let currentSection = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= headerHeight) {
            currentSection = id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeTab]);

  const clearHistory = () => {
    localStorage.removeItem('mrbit_history');
    setHistory([]);
  };

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchValue.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchValue.toLowerCase());
      
      if (activeTab === 'History') {
        return matchesSearch && history.includes(tool.id);
      }
      
      const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchValue, activeCategory, activeTab, history]);

  // Maintain original order for History view
  const orderedFilteredTools = useMemo(() => {
    if (activeTab === 'History') {
      return [...filteredTools].sort((a, b) => history.indexOf(a.id) - history.indexOf(b.id));
    }
    return filteredTools;
  }, [filteredTools, activeTab, history]);

  const featuredTools = useMemo(() => TOOLS.filter(t => t.featured), []);

  const selectedTool = useMemo(() => 
    TOOLS.find(t => t.id === selectedToolId), 
  [selectedToolId]);

  if (selectedTool) {
    const categoryClass = CATEGORY_COLORS[selectedTool.category] || 'misc';
    return (
      <div className={styles.dashboard}>
        <div className={`${styles.toolDetail} ${styles[categoryClass]}`}>
          <div className={styles.toolContainer}>
            <Suspense fallback={
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '320px',
                color: 'var(--text-muted)'
              }}>
                <Loader2 className={styles.spinner} size={40} style={{ marginBottom: '1.25rem' }} />
                <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>Loading tool module...</p>
              </div>
            }>
              {selectedTool.id === 'qr-gen' ? (
                <QRCodeGenerator />
              ) : selectedTool.id === 'qr-scan' ? (
                <QRCodeScanner />
              ) : selectedTool.id === 'wifi-qr' ? (
                <WiFiQRCodeGenerator />
              ) : selectedTool.id === 'vcard-qr' ? (
                <VCardQRCodeGenerator />
              ) : selectedTool.id === 'img-scan' ? (
                <ImageUploadScanner />
              ) : selectedTool.id === 'qr-valid' ? (
                <QRCodeValidator />
              ) : selectedTool.id === 'qr-custom' ? (
                <QRCodeCustomizer />
              ) : selectedTool.id === 'qr-track' ? (
                <QRCodeTracker />
              ) : selectedTool.id === 'email-qr' ? (
                <EmailSMSGenerator />
              ) : selectedTool.id === 'event-qr' ? (
                <EventQRGenerator />
              ) : selectedTool.id === 'bulk-qr' ? (
                <BulkQRGenerator />
              ) : selectedTool.id === 'barcode-gen' ? (
                <BarcodeGenerator />
              ) : selectedTool.id === 'barcode-scan' ? (
                <BarcodeScanner />
              ) : selectedTool.id === 'barcode-conv' ? (
                <BarcodeConverter />
              ) : selectedTool.id === 'batch-qr-scan' ? (
                <BatchQRScanner />
              ) : selectedTool.id === 'dynamic-qr' ? (
                <DynamicQRGenerator />
              ) : selectedTool.id === 'hist-save' ? (
                <HistorySaver />
              ) : selectedTool.id === 'age-calc' ? (
                <AgeCalculator />
              ) : selectedTool.id === 'bmi-calc' ? (
                <BMICalculator />
              ) : selectedTool.id === 'currency-conv' ? (
                <CurrencyConverter />
              ) : selectedTool.id === 'gpa-calc' ? (
                <GPACalculator />
              ) : selectedTool.id === 'loan-calc' ? (
                <LoanCalculator />
              ) : selectedTool.id === 'percent-calc' ? (
                <PercentageCalculator />
              ) : selectedTool.id === 'timezone-conv' ? (
                <TimeZoneConverter />
              ) : selectedTool.id === 'json-format' ? (
                <JSONFormatter />
              ) : selectedTool.id === 'code-beautifier' ? (
                <CodeBeautifier />
              ) : selectedTool.id === 'code-minifier' ? (
                <Minifier />
              ) : selectedTool.id === 'api-tester' ? (
                <APITester />
              ) : selectedTool.id === 'regex-tester' ? (
                <RegexTester />
              ) : selectedTool.id === 'b64-enc' ? (
                <Base64Tools />
              ) : selectedTool.id === 'binary-conv' ? (
                <BinaryConverter />
              ) : selectedTool.id === 'url-enc' ? (
                <URLEncoder />
              ) : selectedTool.id === 'html-enc' ? (
                <HTMLEntities />
              ) : selectedTool.id === 'morse-conv' ? (
                <MorseTranslator />
              ) : selectedTool.id === 'pdf-merge' ? (
                <PDFTools />
              ) : selectedTool.id === 'ocr-text' ? (
                <OCRTool />
              ) : selectedTool.id === 'file-compress' ? (
                <ZIPTool />
              ) : selectedTool.id === 'tts-tool' ? (
                <TTSTool />
              ) : selectedTool.id === 'stt-tool' ? (
                <STTTool />
              ) : selectedTool.id === 'img-to-pdf' ? (
                <ImageToPDF />
              ) : selectedTool.id === 'word-to-pdf' ? (
                <WordToPDF />
              ) : selectedTool.id === 'word-to-txt' ? (
                <WordToTXT />
              ) : selectedTool.id === 'excel-to-pdf' ? (
                <ExcelToPDF />
              ) : selectedTool.id === 'excel-to-word' ? (
                <ExcelToWord />
              ) : selectedTool.id === 'pdf-to-image' ? (
                <PDFToImage />
              ) : selectedTool.id === 'pdf-to-word' ? (
                <PDFToWord />
              ) : selectedTool.id === 'pdf-to-excel' ? (
                <PDFToExcel />
              ) : selectedTool.id === 'pdf-to-ppt' ? (
                <PDFToPowerPoint />
              ) : selectedTool.id === 'ppt-to-pdf' ? (
                <PowerPointToPDF />
              ) : selectedTool.id === 'pub-to-pdf' ? (
                <UniversalDocTool title="Publisher to PDF" description="Convert Microsoft Publisher documents to PDF." />
              ) : selectedTool.id === 'pdf-to-pub' ? (
                <UniversalDocTool title="PDF to Publisher" description="Convert PDF files to Microsoft Publisher format." />
              ) : selectedTool.id === 'keyword-checker' ? (
                <KeywordChecker />
              ) : selectedTool.id === 'meta-gen' ? (
                <MetaGenerator />
              ) : selectedTool.id === 'sitemap-gen' ? (
                <SitemapGenerator />
              ) : selectedTool.id === 'robots-gen' ? (
                <RobotsGenerator />
              ) : selectedTool.id === 'speed-checker' ? (
                <SpeedChecker />
              ) : selectedTool.id === 'whois-lookup' ? (
                <WhoisLookup />
              ) : selectedTool.id === 'hash-gen' ? (
                <HashGenerator />
              ) : selectedTool.id === 'pass-gen' ? (
                <PasswordGenerator />
              ) : selectedTool.id === 'pass-strength' ? (
                <StrengthChecker />
              ) : selectedTool.id === 'ip-lookup' ? (
                <IPLookup />
              ) : selectedTool.id === 'vpn-check' ? (
                <VPNCheck />
              ) : selectedTool.id === 'dice-gen' ? (
                <DiceGenerator />
              ) : selectedTool.id === 'fake-data' ? (
                <FakeDataGenerator />
              ) : selectedTool.id === 'name-gen' ? (
                <NameGenerator />
              ) : selectedTool.id === 'pass-list' ? (
                <PasswordList />
              ) : selectedTool.id === 'case-conv' ? (
                <CaseConverter />
              ) : selectedTool.id === 'img-compress' ? (
                <ImageCompressor />
              ) : selectedTool.id === 'color-picker' ? (
                <ColorPicker />
              ) : selectedTool.id === 'favicon-gen' ? (
                <FaviconGenerator />
              ) : selectedTool.id === 'img-resizer' ? (
                <ImageResizer />
              ) : selectedTool.id === 'bg-remover' ? (
                <BackgroundRemover />
              ) : selectedTool.id === 'logo-gen' ? (
                <LogoGenerator />
              ) : selectedTool.id === 'meme-gen' ? (
                <MemeGenerator />
              ) : selectedTool.id === 'thumb-maker' ? (
                <ThumbnailMaker />
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                  <Box size={48} strokeWidth={1} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                  <p>Tool implementation coming soon...</p>
                </div>
              )}
            </Suspense>
          </div>
        </div>
      </div>
    );
  }

  // Handle Home page
  if (activeTab === 'Home') {
    return <Home setActiveTab={setActiveTab} />;
  }

  // Contribute page
  if (activeTab === 'Contribute') {
    return <Contribute onNavigate={setActiveTab} />;
  }

  // Handle No Sign-ups page
  if (activeTab === 'No Sign-ups') {
    return <NoSignups onNavigate={setActiveTab} searchValue={searchValue} />;
  }

  // Handle AI Tools page
  if (activeTab === 'AI Tools') {
    return <AITools onNavigate={setActiveTab} searchValue={searchValue} />;
  }

  // Handle No-Login Web Apps page
  if (activeTab === 'No-Login Web Apps') {
    return <NoLoginApps onNavigate={setActiveTab} searchValue={searchValue} />;
  }

  // Handle No Sign-ups sub-category directories
  if (activeTab === 'Adblocking / Privacy') {
    return <PrivacyCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Artificial Intelligence') {
    return <AICategory searchValue={searchValue} />;
  }
  if (activeTab === 'Movies / TV / Anime') {
    return <VideoCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Music / Podcasts / Radio') {
    return <AudioCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Gaming / Emulation') {
    return <GamingCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Books / Comics / Manga') {
    return <ReadingCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Downloading') {
    return <DownloadingCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Torrenting') {
    return <TorrentingCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Educational') {
    return <EducationalCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Android / iOS') {
    return <MobileCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Linux / macOS') {
    return <LinuxMacOSCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Non-English') {
    return <NonEnglishCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Miscellaneous') {
    return <MiscCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Libraries') {
    return <LibrariesCategory searchValue={searchValue} />;
  }
  

  // Handle Development sub-category directories
  if (activeTab === 'IDEs, Code Editors, and Development Environments') {
    return <IdesCodeEditorsAndDevelopmentEnvironmentsCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Version Control and Collaboration') {
    return <VersionControlAndCollaborationCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Build Tools, Package Managers, and Dependency Management') {
    return <BuildToolsPackageManagersAndDependencyManagementCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Containerization, Virtualization, and Infrastructure as Code (IaC)') {
    return <ContainerizationVirtualizationAndInfrastructureAsCodeCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Testing, Quality Assurance (QA), and Automation') {
    return <TestingQualityAssuranceQaAndAutomationCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Continuous Integration & Continuous Deployment (CI/CD)') {
    return <ContinuousIntegrationContinuousDeploymentCicdCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Cloud Platforms, Backend-as-a-Service (BaaS), and Infrastructure') {
    return <CloudPlatformsBackendAsAServiceBaasAndInfrastructureCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Database Management and Analytics') {
    return <DatabaseManagementAndAnalyticsCategory searchValue={searchValue} />;
  }
  if (activeTab === 'API Clients, Development, and Testing') {
    return <ApiClientsDevelopmentAndTestingCategory searchValue={searchValue} />;
  }
  if (activeTab === 'AI-Assisted Development, Agents, and Copilots') {
    return <AiassistedDevelopmentAgentsAndCopilotsCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Monitoring, Observability, and Logging') {
    return <MonitoringObservabilityAndLoggingCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Project Management, Collaboration, and Team Communication') {
    return <ProjectManagementCollaborationAndTeamCommunicationCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Documentation, Code Search, and Learning') {
    return <DocumentationCodeSearchAndLearningCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Developer Utilities and Productivity Tools') {
    return <DeveloperUtilitiesAndProductivityToolsCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Web Frameworks and Libraries') {
    return <WebFrameworksAndLibrariesCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Mobile Development and Cross-Platform Tools') {
    return <MobileDevelopmentAndCrossplatformToolsCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Game Development Engines and Tools') {
    return <GameDevelopmentEnginesAndToolsCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Design, Prototyping, and Creative Tools') {
    return <DesignPrototypingAndCreativeToolsCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Data Science, Machine Learning, and AI Platforms') {
    return <DataScienceMachineLearningAndAiPlatformsCategory searchValue={searchValue} />;
  }
  if (activeTab === 'No-Code / Low-Code Development Platforms') {
    return <NocodeLowcodeDevelopmentPlatformsCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Security, Secrets Management, and Authentication') {
    return <SecuritySecretsManagementAndAuthenticationCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Collaboration and Communication (Cross-Functional)') {
    return <CollaborationAndCommunicationCrossfunctionalCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Feature Flagging and Experimentation') {
    return <FeatureFlaggingAndExperimentationCategory searchValue={searchValue} />;
  }
  if (activeTab === 'Platform Engineering and Internal Developer Platforms') {
    return <PlatformEngineeringAndInternalDeveloperPlatformsCategory searchValue={searchValue} />;
  }

  // Handle Software directory
  if (activeTab === 'Software') {
    return <Software searchValue={searchValue} />;
  }

  // Handle alternative subpages
  if (activeTab === 'About') {
    return <About toolCount={TOOLS.length} onNavigate={setActiveTab} />;
  }

  // Handle alternative subpages
  if (activeTab === 'Contact') {
    return (
      <div className={styles.aboutPage}>
        <div className={`${styles.aboutCard} glass`}>
          <h2>Contact Utilify</h2>
          <p className={styles.tagline}>Get in touch with the development and support team.</p>
          
          <div className={styles.contactContainer}>
            <div className={styles.contactInfo}>
              <h4>📬 Reach Us Directly</h4>
              <p>For support, feature requests, or enterprise licensing inquiries, feel free to contact us via email:</p>
              <div className={styles.contactEmailBox}>
                <span>Support Email:</span>
                <strong>mwendaboniface146@gmail.com</strong>
              </div>
              <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Response Time: Typically within 24 business hours.
              </p>
            </div>

            <div className={styles.contactForm}>
              <h4>💬 Send a Message</h4>
              <form onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully! Thank you for reaching out.'); }}>
                <div className={styles.formGroup}>
                  <label>Name</label>
                  <input type="text" placeholder="John Doe" required className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input type="email" placeholder="john@example.com" required className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                  <label>Message</label>
                  <textarea placeholder="Your feedback or support request..." rows={4} required className={styles.formInput} />
                </div>
                <button type="submit" className={styles.submitBtn}>Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'Privacy') {
    const sections = [
      { id: 'scope', title: '1. Scope & Intro', icon: <FileText size={16} /> },
      { id: 'local-first', title: '2. Local Processing', icon: <Lock size={16} /> },
      { id: 'isolation', title: '3. Data Isolation', icon: <ShieldCheck size={16} /> },
      { id: 'storage', title: '4. Storage & Cookies', icon: <Database size={16} /> },
      { id: 'libraries', title: '5. Libraries & CDNs', icon: <FileCode size={16} /> },
      { id: 'rights', title: '6. GDPR & CCPA Rights', icon: <Shield size={16} /> },
      { id: 'network', title: '7. Network Logs', icon: <Globe size={16} /> },
      { id: 'children', title: '8. Kids\' Privacy', icon: <Users size={16} /> },
      { id: 'updates', title: '9. Updates', icon: <RefreshCw size={16} /> },
      { id: 'contact', title: '10. Contact Info', icon: <Mail size={16} /> },
    ];

    const scrollToSection = (id: string) => {
      setActiveSection(id);
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
      <div className={styles.aboutPage}>
        <div className={`${styles.aboutCard} glass`}>
          <h2>Privacy Policy</h2>
          <p className={styles.tagline}>Last Updated: July 2026</p>

          <div className={styles.legalLayout}>
            {/* Sidebar Table of Contents */}
            <aside className={styles.legalSidebar}>
              {sections.map(sec => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`${styles.legalSidebarLink} ${activeSection === sec.id ? styles.legalSidebarLinkActive : ''}`}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {sec.icon}
                    {sec.title}
                  </span>
                </button>
              ))}
            </aside>

            {/* Document Content */}
            <div className={styles.legalContent}>
              {/* Callout Box */}
              <div className={`${styles.legalCallout} ${styles.legalCalloutSuccess}`}>
                <div className={styles.legalCalloutIcon}>
                  <ShieldCheck size={24} />
                </div>
                <div className={styles.legalCalloutContent}>
                  <h4>Zero-Data-Transmission Architecture Verified</h4>
                  <p>
                    All utility operations run 100% locally inside your browser sandbox. No files, passwords, or personal data ever leave your machine.
                  </p>
                </div>
              </div>

              <section id="scope" className={styles.legalSection}>
                <h3 className={styles.legalSectionTitle}>
                  <FileText size={18} />
                  1. Introduction and Scope
                </h3>
                <p className={styles.legalText}>
                  Utilify ("we," "our," or "us") is dedicated to protecting your digital privacy. This Privacy Policy outlines how our web applications and utility suite process, handle, and safeguard user data. By accessing or using Utilify, you agree to the processing activities described in this policy.
                </p>
              </section>

              <section id="local-first" className={styles.legalSection}>
                <h3 className={styles.legalSectionTitle}>
                  <Lock size={18} />
                  2. Local-First Processing (Zero-Data Architecture)
                </h3>
                <p className={styles.legalText}>
                  Unlike traditional web utilities, Utilify is designed with a strict zero-data-transmission architecture. Every utility—including cryptographic hashing, image compression, PDF operations, calculators, converters, and QR scanner/generator tools—executes 100% locally within your browser sandbox. No file uploads, inputs, strings, credentials, or keys are ever transmitted to our servers or any third-party APIs.
                </p>
              </section>

              <section id="isolation" className={styles.legalSection}>
                <h3 className={styles.legalSectionTitle}>
                  <ShieldCheck size={18} />
                  3. Complete Data Isolation
                </h3>
                <p className={styles.legalText}>
                  All source code runs client-side using JavaScript, Web Workers, and WebAssembly. Your documents, text, passwords, and other inputs remain entirely on your local hardware node. When you close the browser tab, all transient data in the application's RAM state is permanently cleared.
                </p>
              </section>

              <section id="storage" className={styles.legalSection}>
                <h3 className={styles.legalSectionTitle}>
                  <Database size={18} />
                  4. Browser Local Storage & Cookies
                </h3>
                <p className={styles.legalText}>
                  We use standard browser local storage (<code>localStorage</code>) strictly to save your tool usage preferences and launch history for your convenience. This data is stored entirely on your device, is never shared, and can be cleared at any time.
                </p>
                <div className={`${styles.legalCallout} ${styles.legalCalloutInfo}`} style={{ padding: '1rem', marginTop: '0.5rem' }}>
                  <div className={styles.legalCalloutIcon}>
                    <Shield size={18} />
                  </div>
                  <div className={styles.legalCalloutContent}>
                    <h4 style={{ fontSize: '0.9rem' }}>Cookie-Banner Exemption Notice</h4>
                    <p style={{ fontSize: '0.85rem' }}>
                      Utilify does not use any tracking, advertising, marketing, or profiling cookies. Under GDPR and ePrivacy regulations, this website is completely exempt from requiring a cookie consent banner.
                    </p>
                  </div>
                </div>
              </section>

              <section id="libraries" className={styles.legalSection}>
                <h3 className={styles.legalSectionTitle}>
                  <FileCode size={18} />
                  5. Third-Party Open-Source Libraries
                </h3>
                <p className={styles.legalText}>
                  Utilify uses several third-party libraries (e.g., pdf-lib, Tesseract.js, sheetjs) to perform specialized actions (such as image OCR or spreadsheet parsing). These libraries run in-browser inside web workers. While we verify the source repositories of these libraries, we recommend developers audit the browser network inspector for complete peace of mind.
                </p>
              </section>

              <section id="rights" className={styles.legalSection}>
                <h3 className={styles.legalSectionTitle}>
                  <Shield size={18} />
                  6. GDPR & CCPA Data Rights
                </h3>
                <p className={styles.legalText}>
                  Under international privacy frameworks like GDPR (EU General Data Protection Regulation) and CCPA (California Consumer Privacy Act), you hold explicit rights to access, restrict, or delete your data. Because Utilify does not collect or transmit any data, you already exercise 100% control. Your data is stored on your device and can be cleared instantly by resetting your browser data or deleting your Utilify launch history.
                </p>
              </section>

              <section id="network" className={styles.legalSection}>
                <h3 className={styles.legalSectionTitle}>
                  <Globe size={18} />
                  7. Server Infrastructure & Network Logs
                </h3>
                <p className={styles.legalText}>
                  Our website assets are hosted on global Content Delivery Networks (CDNs) to ensure fast load times. When you request the website assets, the hosting provider (e.g., Netlify, GitHub Pages) may automatically log basic, non-identifying request data such as your IP address, browser type, and timestamp to prevent DDoS attacks and ensure service reliability. We do not link these server logs to your local tool utilization.
                </p>
              </section>

              <section id="children" className={styles.legalSection}>
                <h3 className={styles.legalSectionTitle}>
                  <Users size={18} />
                  8. Children's Privacy
                </h3>
                <p className={styles.legalText}>
                  Our services do not collect personal data from anyone, including children under the age of 13. Since we do not host user accounts or store data on remote databases, we are fully compliant with COPPA (Children's Online Privacy Protection Act) and similar global privacy frameworks.
                </p>
              </section>

              <section id="updates" className={styles.legalSection}>
                <h3 className={styles.legalSectionTitle}>
                  <RefreshCw size={18} />
                  9. Updates to This Policy
                </h3>
                <p className={styles.legalText}>
                  We reserve the right to modify this Privacy Policy as our utility library expands. Any changes will be indicated by updating the "Last Updated" date at the top of this page. Your continued use of the website after changes are posted constitutes acceptance of those changes.
                </p>
              </section>

              <section id="contact" className={styles.legalSection}>
                <h3 className={styles.legalSectionTitle}>
                  <Mail size={18} />
                  10. Contact Us
                </h3>
                <p className={styles.legalText}>
                  If you have any questions or feedback regarding our privacy practices, please contact us at <strong>mwendaboniface146@gmail.com</strong>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'Terms') {
    const sections = [
      { id: 'agreement', title: '1. Agreement', icon: <Scale size={16} /> },
      { id: 'ownership', title: '2. Output Ownership', icon: <Heart size={16} /> },
      { id: 'license', title: '3. License', icon: <FileText size={16} /> },
      { id: 'conduct', title: '4. Conduct', icon: <ShieldAlert size={16} /> },
      { id: 'dependencies', title: '5. Resources & CDN', icon: <Activity size={16} /> },
      { id: 'warranties', title: '6. Warranty Disclaimer', icon: <FileWarning size={16} /> },
      { id: 'liability', title: '7. Liability Limits', icon: <ShieldAlert size={16} /> },
      { id: 'dmca', title: '8. DMCA Claims', icon: <Lock size={16} /> },
      { id: 'law', title: '9. Governing Law', icon: <Globe size={16} /> },
      { id: 'mods', title: '10. Modifications', icon: <RefreshCw size={16} /> },
    ];

    const scrollToSection = (id: string) => {
      setActiveSection(id);
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
      <div className={styles.aboutPage}>
        <div className={`${styles.aboutCard} glass`}>
          <h2>Terms of Service</h2>
          <p className={styles.tagline}>Last Updated: July 2026</p>

          <div className={styles.legalLayout}>
            {/* Sidebar Table of Contents */}
            <aside className={styles.legalSidebar}>
              {sections.map(sec => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`${styles.legalSidebarLink} ${activeSection === sec.id ? styles.legalSidebarLinkActive : ''}`}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {sec.icon}
                    {sec.title}
                  </span>
                </button>
              ))}
            </aside>

            {/* Document Content */}
            <div className={styles.legalContent}>
              {/* Callout Box */}
              <div className={`${styles.legalCallout} ${styles.legalCalloutWarning}`}>
                <div className={styles.legalCalloutIcon}>
                  <ShieldAlert size={24} />
                </div>
                <div className={styles.legalCalloutContent}>
                  <h4>Important User Disclaimer</h4>
                  <p>
                    Utilify is provided as-is without any warranties. Please verify critical financial, cryptographic, or operational tool outputs independently.
                  </p>
                </div>
              </div>

              <section id="agreement" className={styles.legalSection}>
                <h3 className={styles.legalSectionTitle}>
                  <Scale size={18} />
                  1. Agreement to Terms
                </h3>
                <p className={styles.legalText}>
                  By accessing or using Utilify, you agree to be bound by these Terms of Service and all applicable local, national, and international laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </p>
              </section>

              <section id="ownership" className={styles.legalSection}>
                <h3 className={styles.legalSectionTitle}>
                  <Heart size={18} />
                  2. Intellectual Property & Output Ownership
                </h3>
                <p className={styles.legalText}>
                  The Utilify software platform, brand tokens, interface layouts, and source code are the intellectual property of the project authors and contributors. However, <strong>you retain 100% ownership and copyright of any outputs created using the tools</strong>. This includes compressed images, generated QR codes, hashes, formatted code files, and calculations, all of which you may use for commercial purposes without attribution.
                </p>
              </section>

              <section id="license" className={styles.legalSection}>
                <h3 className={styles.legalSectionTitle}>
                  <FileText size={18} />
                  3. License and Permitted Use
                </h3>
                <p className={styles.legalText}>
                  We grant you a free, non-exclusive, non-transferable, revocable license to access and use the tools for personal, academic, professional, and commercial purposes. You may build assets, compress images, generate codes, and format files freely for commercial distribution.
                </p>
              </section>

              <section id="conduct" className={styles.legalSection}>
                <h3 className={styles.legalSectionTitle}>
                  <ShieldAlert size={18} />
                  4. User Conduct & Restrictions
                </h3>
                <p className={styles.legalText}>
                  You agree not to use the tools to generate malicious content, perform automated attacks, scan network targets without authorization, or engage in any behavior that violates the rights of others or applicable laws. You must not attempt to disrupt the integrity or security of our web infrastructure hosting assets.
                </p>
              </section>

              <section id="dependencies" className={styles.legalSection}>
                <h3 className={styles.legalSectionTitle}>
                  <Activity size={18} />
                  5. Local Resource Dependencies & CDN Availability
                </h3>
                <p className={styles.legalText}>
                  Since all utility operations occur client-side, the performance, speed, and execution capabilities (especially for large file merges, OCR, and complex document conversions) depend entirely on the CPU, RAM, and hardware configuration of your device. Utilify is not responsible for any application freezes or slow execution caused by local hardware constraints. While execution is offline-capable, asset retrieval requires connecting to our hosting CDNs.
                </p>
              </section>

              <section id="warranties" className={styles.legalSection}>
                <h3 className={styles.legalSectionTitle}>
                  <FileWarning size={18} />
                  6. Disclaimer of Warranties
                </h3>
                <p className={styles.legalText}>
                  Utilify is provided "as is" and "as available," without warranties of any kind, express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the outputs generated by our calculators, converters, encoders, or document processors are 100% error-free. Users are advised to verify critical financial, security, or scientific calculations independently.
                </p>
              </section>

              <section id="liability" className={styles.legalSection}>
                <h3 className={styles.legalSectionTitle}>
                  <ShieldAlert size={18} />
                  7. Limitation of Liability
                </h3>
                <p className={styles.legalText}>
                  In no event shall Utilify, its developers, or its contributors be liable for any direct, indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses resulting from your access to, use of, or inability to use the tools.
                </p>
              </section>

              <section id="dmca" className={styles.legalSection}>
                <h3 className={styles.legalSectionTitle}>
                  <Lock size={18} />
                  8. DMCA & Copyright Infringement Claims
                </h3>
                <p className={styles.legalText}>
                  We respect the intellectual property of others. If you believe that any code library or contribution hosted on our repository infringes upon your copyright, you may submit a formal notification under the Digital Millennium Copyright Act (DMCA) by emailing our designated agent at <strong>mwendaboniface146@gmail.com</strong> with details of the alleged infringement.
                </p>
              </section>

              <section id="law" className={styles.legalSection}>
                <h3 className={styles.legalSectionTitle}>
                  <Globe size={18} />
                  9. Governing Law
                </h3>
                <p className={styles.legalText}>
                  These terms and conditions are governed by and construed in accordance with the laws of Kenya, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                </p>
              </section>

              <section id="mods" className={styles.legalSection}>
                <h3 className={styles.legalSectionTitle}>
                  <RefreshCw size={18} />
                  10. Modifications
                </h3>
                <p className={styles.legalText}>
                  We reserve the right to revise these Terms of Service at any time without notice. By using this website, you agree to be bound by the then-current version of these Terms of Service.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'Sitemap') {
    return (
      <div className={styles.aboutPage}>
        <div className={`${styles.aboutCard} glass`}>
          <h2>Website Sitemap</h2>
          <p className={styles.tagline}>Browse all available categories and utility modules on Utilify.</p>
          
          <div className={styles.sitemapGroup}>
            {CATEGORIES.filter(c => c !== 'All').map(cat => {
              const catTools = TOOLS.filter(t => t.category === cat);
              return (
                <div key={cat} className={styles.sitemapCategory}>
                  <h3>{cat}</h3>
                  <div className={styles.sitemapLinksGrid}>
                    {catTools.map(tool => (
                      <a 
                        key={tool.id} 
                        href={`#/tools/${tool.id}`} 
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedToolId(tool.id);
                        }}
                      >
                        {tool.name}
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === '404') {
    return (
      <div className={styles.aboutPage} style={{ textAlign: 'center' }}>
        <div className={`${styles.aboutCard} glass`} style={{ maxWidth: '500px', margin: '4rem auto' }}>
          <div className={styles.errorIconWrapper}>
            <ShieldAlert size={48} color="#ef4444" />
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>404 - Page Not Found</h2>
          <p className={styles.tagline} style={{ marginBottom: '2rem' }}>
            The requested page hash does not exist or has been relocated.
          </p>
          <button 
            onClick={() => setActiveTab('Tools')} 
            className={styles.submitBtn}
            style={{ width: 'auto', display: 'inline-flex', alignSelf: 'center', padding: '0.85rem 2rem' }}
          >
            Return to Workspace Hub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      {activeTab === 'Tools' && (
          <nav className={styles.filterSection}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`${styles.filterChip} ${activeCategory === cat ? styles.filterChipActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeFilterBubble"
                    className={styles.activeFilterBubble}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={styles.filterText}>{cat}</span>
              </button>
            ))}
          </nav>
        )}

        {/* Featured Tools - Only show on main Tools landing */}
        {activeTab === 'Tools' && searchValue === '' && activeCategory === 'All' && (
          <section className={styles.featuredSection}>
            <div className={styles.sectionHeader}>
              <Star size={18} fill="var(--primary)" color="var(--primary)" />
              <h2>Featured Tools</h2>
              <span className={styles.badge}>Most Used</span>
            </div>
            <div className={styles.grid}>
              {featuredTools.map(tool => (
                <ToolCard 
                  key={tool.id} 
                  tool={tool} 
                  onClick={() => setSelectedToolId(tool.id)} 
                />
              ))}
            </div>
          </section>
        )}

        {/* Main utilities grid */}
        <section className={styles.toolSection}>
          <div className={styles.sectionHeader}>
            <LayoutGrid size={18} color="var(--text-muted)" />
            <h2>
              {activeTab === 'History' 
                ? 'Relaunch Logs' 
                : activeCategory === 'All' 
                ? 'All Utilities' 
                : `${activeCategory} Tools`}
            </h2>
          </div>
          
          {orderedFilteredTools.length > 0 ? (
            <motion.div layout className={styles.grid}>
              <AnimatePresence mode="popLayout">
                {orderedFilteredTools.map(tool => (
                  <ToolCard 
                    key={tool.id} 
                    tool={tool} 
                    onClick={() => setSelectedToolId(tool.id)} 
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className={styles.noResults}>
              <Search size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
              <h3>No tools found</h3>
              <p>
                {activeTab === 'History' 
                  ? "Your launch history is empty. Launch some tools from the hub first!" 
                  : 'Try searching for something else or change the category filter.'}
              </p>
            </div>
          )}
        </section>
        
        {activeTab === 'History' && history.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <button 
              onClick={clearHistory}
              style={{
                padding: '0.6rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                backgroundColor: 'rgba(244, 63, 94, 0.08)',
                color: '#f43f5e',
                fontWeight: 700,
                fontSize: '0.9rem'
              }}
            >
              Clear Launch History
            </button>
          </div>
        )}
    </div>
  );
};

const ToolCard: React.FC<{ 
  tool: Tool; 
  onClick: () => void; 
}> = ({ tool, onClick }) => {
  const categoryClass = CATEGORY_COLORS[tool.category] || 'misc';
  
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.24 }}
      className={`${styles.toolCard} ${styles[categoryClass]} glass`} 
      onClick={onClick}
    >
      <div className={styles.iconWrapper}>
        {tool.icon}
      </div>
      <div className={styles.toolInfo}>
        <span className={styles.categoryBadge}>{tool.category}</span>
        <h3>{tool.name}</h3>
        <p>{tool.description}</p>
      </div>
      <div className={styles.cardFooter}>
        <span>Launch Tool</span>
        <ArrowRight size={16} />
      </div>
    </motion.div>
  );
};

export default Dashboard;
