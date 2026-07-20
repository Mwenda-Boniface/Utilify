export interface SoftwareItem {
  name: string;
  url: string;
  desc: string;
}

export interface SoftwareSection {
  title: string;
  items: SoftwareItem[];
}

export const SOFTWARE_SECTIONS: SoftwareSection[] = [
  {
    title: 'General Software Download',
    items: [
      { name: 'Ninite', url: 'https://ninite.com/', desc: 'Bulk installer for essential Windows apps' },
      { name: 'GetIntoPC', url: 'https://getintopc.com/', desc: 'Wide range of Windows software including premium versions' },
      { name: 'FileCR', url: 'https://filecr.com/', desc: 'Free downloads for Windows, macOS, Android, games, e-books' },
      { name: 'FileHippo', url: 'https://filehippo.com/', desc: 'Huge library of free applications' },
      { name: 'Softpedia', url: 'https://softpedia.com/', desc: 'Trusted hub for free & clean software downloads' },
      { name: 'MajorGeeks', url: 'https://www.majorgeeks.com/', desc: 'Trusted site for free utilities, security, and performance tools' },
      { name: 'Softonic', url: 'https://www.softonic.com/', desc: 'Over 50,000 programs for Windows, Mac, Linux' },
      { name: 'Uptodown', url: 'https://uptodown.com/', desc: 'International download site for mobile apps and desktop software' },
      { name: 'CNET Download', url: 'https://download.cnet.com/', desc: 'Long-standing software repository' },
      { name: 'SourceForge', url: 'https://sourceforge.net/', desc: 'One of the oldest open-source platforms' },
      { name: 'FileHorse', url: 'https://filehorse.com/', desc: 'Fast and simple software downloads' },
      { name: 'FilePuma', url: 'https://www.filepuma.com/', desc: 'Intuitive catalog of maintenance and driver utilities' },
      { name: 'FossHub', url: 'https://www.fosshub.com/', desc: 'Clean FOSS downloads with multi-AV scanning' },
      { name: 'SnapFiles', url: 'https://www.snapfiles.com/', desc: 'Ad-free directory separating freeware from shareware' },
      { name: 'LO4D.com', url: 'https://www.lo4d.com/', desc: 'Free software repository with reviews and virus tests' },
      { name: 'AppAgg', url: 'https://appagg.com/', desc: 'Application aggregator supporting all major platforms' },
      { name: 'Software Informer', url: 'https://software.informer.com/', desc: 'Up-to-date software information and updates' },
      { name: 'TechSpot Downloads', url: 'https://techspot.com/downloads/', desc: 'Tech-focused software library' },
      { name: 'AlternativeTo', url: 'https://alternativeto.net/', desc: 'Find free & open-source alternatives to paid software' },
      { name: 'Free Software Directory', url: 'https://directory.fsf.org/', desc: 'FSF/UNESCO catalog of useful free software' },
      { name: 'Download Crew', url: 'https://downloadcrew.com/', desc: 'Software download directory' },
      { name: 'Soft112', url: 'https://soft112.com/', desc: 'Software library for Windows, Linux, macOS, Android, iOS' },
      { name: 'FileForum', url: 'https://fileforum.com/', desc: 'Free file downloads and software reviews' },
      { name: 'Free To Download', url: 'https://freetodownload.com/', desc: 'Comprehensive software directory' },
      { name: 'SoftArmy', url: 'https://softarmy.com/', desc: 'Free downloads for Windows' },
      { name: 'Software Villa', url: 'https://softwarevilla.com/', desc: 'Windows and Mac software including freeware and trialware' },
      { name: 'Rocket Files', url: 'https://rocketfiles.com/', desc: 'Software discovery for Windows, Mac, Android & iPhone' },
      { name: 'Winwares', url: 'https://winwares.com/', desc: 'Open source apps, utility programs, freeware and shareware' },
      { name: 'AppShopper', url: 'https://appshopper.com/', desc: 'iPhone, iPad, and Mac app directory' },
      { name: 'Mr. Free Tools', url: 'https://mrfree.tools/', desc: 'Directory site with advanced search engine for free software' },
      { name: 'Open HUB', url: 'https://openhub.net/', desc: 'Open source project discovery and analytics' },
      { name: 'Softorage', url: 'https://softorage.com/', desc: 'Software download directory' }
    ]
  },
  {
    title: 'Open Source & FOSS',
    items: [
      { name: 'GitHub', url: 'https://github.com/', desc: 'Massive repository for open-source software' },
      { name: 'SourceForge', url: 'https://sourceforge.net/', desc: 'Open-source software platform' },
      { name: 'FossHub', url: 'https://www.fosshub.com/', desc: 'FOSS downloads with multi-AV scanning' },
      { name: 'Free Software Directory', url: 'https://directory.fsf.org/', desc: 'FSF/UNESCO free software catalog' },
      { name: 'Open HUB', url: 'https://openhub.net/', desc: 'Open source project analytics' },
      { name: 'Apache Software Foundation', url: 'https://apache.org/', desc: 'Home for hundreds of open source projects' },
      { name: 'Launchpad', url: 'https://launchpad.net/', desc: 'Open source software collaboration platform' },
      { name: 'Gitorious', url: 'https://gitorious.org/', desc: 'Open source project hosting' },
      { name: 'Google Code Archive', url: 'https://code.google.com/archive/', desc: 'Archived open source projects' },
      { name: 'Flathub', url: 'https://flathub.org/', desc: 'Flatpak application repository for Linux' },
      { name: 'F-Droid', url: 'https://f-droid.org/', desc: 'FOSS Android app repository' },
      { name: 'npm', url: 'https://npmjs.org/', desc: 'JavaScript/Node.js package registry' },
      { name: 'Maven Central', url: 'https://search.maven.org/', desc: 'Java/JVM ecosystem package repository' },
      { name: 'OSS Gallery', url: 'https://ossgallery.com/', desc: 'Open source software discovery' },
      { name: 'Awesome Open Source', url: 'https://awesomeopensource.com/', desc: 'Curated open source projects' },
      { name: 'European Alternatives', url: 'https://european-alternatives.eu/', desc: 'Open source alternatives' },
      { name: 'Ecosyste.ms', url: 'https://ecosyste.ms/', desc: 'Open source project ecosystem tracking' }
    ]
  },
  {
    title: 'Portable Software',
    items: [
      { name: 'PortableApps.com', url: 'https://portableapps.com/', desc: 'Over 1,400 portable packages, 1.2 billion downloads' },
      { name: 'FC Portables', url: 'https://fcportables.com/', desc: 'Comprehensive collection of portable software' },
      { name: 'WinPenPack', url: 'https://winpenpack.com/', desc: 'Portable software for Windows' },
      { name: 'Portapps.io', url: 'https://portapps.io/', desc: 'Portable app packages' },
      { name: 'NirSoft', url: 'https://www.nirsoft.net/', desc: 'Lightweight, portable standalone utilities' }
    ]
  },
  {
    title: 'Mac Software',
    items: [
      { name: 'MacUpdate', url: 'https://macupdate.com/', desc: 'Most complete resource for Mac software' },
      { name: 'App Store', url: 'https://www.apple.com/app-store/', desc: 'Official Apple application store' },
      { name: 'Nmac.to', url: 'https://nmac.to/', desc: 'Mac software downloads' },
      { name: 'TorrentMac', url: 'https://www.torrentmac.net/', desc: 'Mac software via torrent' },
      { name: 'MacEnJoy', url: 'https://www.macenjoy.co/', desc: 'Mac software downloads' },
      { name: 'Digit77', url: 'https://www.digit77.com/', desc: 'Mac software downloads' },
      { name: 'Macked', url: 'https://macked.app/', desc: 'Mac software downloads' },
      { name: 'MacWK', url: 'https://macwk.cn/', desc: 'Mac software downloads' },
      { name: 'HaxMac', url: 'https://haxmac.cc/', desc: 'Mac software downloads' },
      { name: 'Pure-Mac', url: 'https://pure-mac.com/', desc: 'One of the first Macintosh software compendiums' },
      { name: 'Ocean of DMG', url: 'https://oceanofdmg.com/', desc: 'Mac DMG software downloads' },
      { name: 'MacBed', url: 'https://macbed.com/', desc: 'Mac software downloads' },
      { name: 'AppCake', url: 'https://appcake.com/', desc: 'Mac and iOS apps' },
      { name: 'Awesome Mac', url: 'https://wangchujiang.com/awesome-mac/', desc: 'Curated Mac software list' },
      { name: 'My-macOS', url: 'https://my-macos.com/', desc: 'macOS resources' }
    ]
  },
  {
    title: 'Linux Software & Repositories',
    items: [
      { name: 'DistroWatch', url: 'https://distrowatch.com/', desc: 'Download & compare Linux distributions' },
      { name: 'Linux.org', url: 'https://linux.org/pages/download', desc: 'Find links to popular Linux distributions' },
      { name: 'Ubuntu Packages', url: 'https://packages.ubuntu.com/', desc: 'Ubuntu package archive' },
      { name: 'RPM Fusion', url: 'https://rpmfusion.org/', desc: 'Software for Fedora/Red Hat' },
      { name: 'IUS', url: 'https://ius.io/', desc: 'Newer software versions for RHEL/CentOS' },
      { name: 'EPEL', url: 'https://fedoraproject.org/wiki/EPEL', desc: 'Extra Packages for Enterprise Linux' },
      { name: 'Arch Linux Packages', url: 'https://archlinux.org/packages/', desc: 'Arch Linux package repository' },
      { name: 'Linux Mint Repositories', url: 'https://linuxmint.com/', desc: 'Linux Mint software' },
      { name: 'Rocky Linux', url: 'https://rockylinux.org/', desc: 'Rocky Linux distributions' },
      { name: 'Mirror.webworld.ie', url: 'https://mirror.webworld.ie/', desc: 'Ireland\'s largest free software repository' },
      { name: 'Kernel.org', url: 'https://www.kernel.org/', desc: 'Linux kernel and related software' },
      { name: 'OpenSUSE Software', url: 'https://software.opensuse.org/', desc: 'OpenSUSE package search' },
      { name: 'Debian Packages', url: 'https://packages.debian.org/', desc: 'Debian package archive' }
    ]
  },
  {
    title: 'Android APK Download',
    items: [
      { name: 'APKMirror', url: 'https://apkmirror.com/', desc: 'Most trusted platform for Android APKs' },
      { name: 'APKPure', url: 'https://apkpure.com/', desc: 'Android app downloads' },
      { name: 'F-Droid', url: 'https://f-droid.org/', desc: 'FOSS Android app repository' },
      { name: 'Uptodown', url: 'https://uptodown.com/', desc: 'International download site for mobile apps' },
      { name: 'Aptoide', url: 'https://aptoide.com/', desc: 'Third-party Android app store' },
      { name: 'Amazon Appstore', url: 'https://www.amazon.com/appstore', desc: 'Amazon\'s Android app store' },
      { name: 'APKCombo', url: 'https://apkcombo.com/', desc: 'APK download site' },
      { name: 'APKMonk', url: 'https://apkmonk.com/', desc: 'Android APK downloads' },
      { name: 'APKDownload', url: 'https://apkdownload.com/', desc: 'APK download site' },
      { name: 'APKFollow', url: 'https://apkfollow.com/', desc: 'Android APK downloads' },
      { name: 'APKHere', url: 'https://apkhere.com/', desc: 'APK download site' },
      { name: 'APKPlz', url: 'https://apkplz.net/', desc: 'Android APK downloads' },
      { name: 'APKSupport', url: 'https://apksupport.com/', desc: 'APK download site' },
      { name: 'APKMB', url: 'https://apkmb.com/', desc: 'Android APK downloads' },
      { name: 'APKResult', url: 'https://apkresult.com/', desc: 'APK download site' },
      { name: 'APKPink', url: 'https://apkpink.com/', desc: 'Android APK downloads' },
      { name: 'APKShub', url: 'https://apkshub.com/', desc: 'APK download site' },
      { name: 'APKMod', url: 'https://apkmod.com/', desc: 'Modded APK downloads' }
    ]
  },
  {
    title: 'Old Version / Legacy Software',
    items: [
      { name: 'OldVersion.com', url: 'https://www.oldversion.com/', desc: 'Since 2001, extensive collection of old software' },
      { name: 'OldApps.com', url: 'https://oldapps.com/', desc: 'Old versions for Windows, Mac, and Linux' },
      { name: 'Oldware.org', url: 'https://oldware.org/', desc: 'Well-organized old Windows software' },
      { name: 'Last Freeware Version', url: 'https://321download.com/', desc: 'Free versions of now-paid software' },
      { name: 'WinWorld', url: 'https://winworldpc.com/', desc: 'Museum of abandonware and old software' },
      { name: 'Internet Archive Software Library', url: 'https://archive.org/details/software', desc: 'Vintage games and software' },
      { name: 'OlderGeeks', url: 'https://www.oldergeeks.com/', desc: '"No ads, no crapware" policy since 2008' },
      { name: 'FileHippo', url: 'https://filehippo.com/', desc: 'Version history for many apps' },
      { name: 'MajorGeeks', url: 'https://www.majorgeeks.com/', desc: 'Utilities and tools across multiple Windows eras' },
      { name: 'Softpedia', url: 'https://softpedia.com/', desc: 'Clean verified installers' },
      { name: 'Abandonware DOS', url: 'https://www.abandonwaredos.com/', desc: 'DOS abandonware games' }
    ]
  },
  {
    title: 'Giveaways & Free Licenses',
    items: [
      { name: 'Giveaway of the Day', url: 'https://giveawayoftheday.com/', desc: 'New paid software free every 24 hours' },
      { name: 'SharewareOnSale', url: 'https://sharewareonsale.com/', desc: 'Professional/utility software deals' },
      { name: 'BitsDuJour', url: 'https://bitsdujour.com/', desc: 'Productivity/creative software promotions' },
      { name: 'Vovsoft Giveaway', url: 'https://vovsoft.com/giveaway/', desc: 'Weekly Windows software deals' },
      { name: 'Giveaways Networks', url: 'https://giveawaysnetworks.com/', desc: 'Multiple paid software free daily' },
      { name: 'MostiWant', url: 'https://mostiwant.com/', desc: 'Software giveaways and free downloads' },
      { name: 'AppSumo', url: 'https://appsumo.com/', desc: 'Software deals for entrepreneurs' },
      { name: 'DealFuel', url: 'https://dealfuel.com/', desc: 'Software deals and giveaways' },
      { name: 'Pitchground', url: 'https://pitchground.com/', desc: 'SaaS deals' },
      { name: 'SaaS Mantra', url: 'https://saasmantra.com/', desc: 'SaaS deals and giveaways' },
      { name: 'Tickgiveaway', url: 'https://tickgiveaway.com/', desc: 'Software giveaway website' },
      { name: 'Zemania', url: 'https://zemania.com/', desc: 'Software giveaways' }
    ]
  },
  {
    title: 'Torrent & DDL Software',
    items: [
      { name: 'CS.RIN.RU', url: 'https://cs.rin.ru/forum', desc: 'Download/forum for games and software' },
      { name: 'SteamRIP', url: 'https://steamrip.com/', desc: 'Pre-installed game downloads' },
      { name: 'AnkerGames', url: 'https://ankergames.net/', desc: 'Download/torrent games' },
      { name: 'AstralGames', url: 'https://astralgames.net/', desc: 'Game downloads with achievements' },
      { name: 'UnionCrax', url: 'https://union-crax.xyz/', desc: 'Download/torrent' },
      { name: 'Online Fix', url: 'https://online-fix.me/', desc: 'Download/torrent/multiplayer' },
      { name: 'GameBounty', url: 'https://gamebounty.world/', desc: 'Pre-installed games' },
      { name: 'SteamUnderground', url: 'https://steamunderground.net/', desc: 'Pre-installed games' },
      { name: 'Ova Games', url: 'https://www.ovagames.com/', desc: 'Game downloads' },
      { name: 'Torrminatorr', url: 'https://forum.torrminatorr.com/', desc: 'Download/forum' },
      { name: 'GameCopyWorld', url: 'https://gamecopyworld.com/', desc: 'Game cracks and fixes' },
      { name: 'AppTorrent', url: 'https://appstorrent.ru/', desc: 'Mac software torrents' },
      { name: '4Download', url: 'https://4download.com/', desc: 'Repacked/cracked commercial software' }
    ]
  },
  {
    title: 'Search Engines',
    items: [
      { name: 'Virgil Software Search', url: 'https://virgil.samidy.com/Software/', desc: 'Multi-site software search engine' },
      { name: 'AlternativeTo', url: 'https://alternativeto.net/', desc: 'Find software alternatives' },
      { name: 'Rave Book Search', url: 'https://ravebooksearch.com/', desc: 'Multi-site book search' },
      { name: 'Class Central', url: 'https://www.classcentral.com/', desc: 'Search for courses' },
      { name: 'Course CSE', url: 'https://cse.google.com/cse?cx=67ed14bf7b99643e3', desc: 'Multi-site course search' }
    ]
  },
  {
    title: 'Cracked & Repacked',
    items: [
      { name: 'FileCR', url: 'https://filecr.com/', desc: 'Safe site for cracked software' },
      { name: 'GetIntoPC', url: 'https://getintopc.com/', desc: 'Comprehensive platform for premium software' },
      { name: 'CracksURL', url: 'https://cracksurl.com/', desc: 'Cracked software with download guide' },
      { name: 'Virgil Software Search', url: 'https://virgil.samidy.com/Software/', desc: 'Multi-site software search' },
      { name: 'Babiato Forums', url: 'https://babiato.co/', desc: 'Cracked WordPress plugins' },
      { name: 'RequestCracks', url: 'https://requestcracks.com/', desc: 'Request and share cracked software' },
      { name: 'Badshahuploads', url: 'https://badshahuploads.xyz/', desc: 'Cracked software, video tutorials, e-books' },
      { name: 'RockMods', url: 'https://rockmods.net/', desc: 'Modded Android APKs' },
      { name: 'APKMody', url: 'https://apkmody.com/', desc: 'Modded Android APKs' }
    ]
  },
  {
    title: 'File Sharing & Hosting',
    items: [
      { name: 'MEGA', url: 'https://mega.nz/', desc: 'Cloud storage and file sharing' },
      { name: 'MediaFire', url: 'https://mediafire.com/', desc: 'File hosting and sharing' },
      { name: '4Shared', url: 'https://4shared.com/', desc: 'File sharing and storage' },
      { name: 'WeTransfer', url: 'https://wetransfer.com/', desc: 'Share up to 2GB free without account' },
      { name: 'GoFile', url: 'https://gofile.io/', desc: 'Free file hosting' },
      { name: 'Pixeldrain', url: 'https://pixeldrain.com/', desc: 'File sharing' },
      { name: 'Catbox', url: 'https://catbox.moe/', desc: 'File hosting' },
      { name: 'MegaUp', url: 'https://megaup.net/', desc: 'File hosting' },
      { name: 'DropMeFiles', url: 'https://dropmefiles.com/', desc: 'File sharing' },
      { name: 'Files.fm', url: 'https://files.fm/', desc: 'File hosting' },
      { name: 'Smash', url: 'https://smash.co/', desc: 'File sharing' },
      { name: 'Send Anywhere', url: 'https://send-anywhere.com/', desc: 'P2P file transfer' },
      { name: 'Instant.io', url: 'https://instant.io/', desc: 'Browser-based P2P file sharing' },
      { name: 'FileTC', url: 'https://file.tc/', desc: 'File sharing' },
      { name: 'Bowfile', url: 'https://bowfile.com/', desc: 'File hosting with shared folder support' },
      { name: 'Buzzheavier', url: 'https://buzzheavier.com/', desc: 'File hosting' },
      { name: 'Datanodes', url: 'https://datanodes.to/', desc: 'File hosting' },
      { name: 'Download.gg', url: 'https://download.gg/', desc: 'File hosting' },
      { name: 'SaberCatHost', url: 'https://sabercathost.com/', desc: 'File hosting' }
    ]
  },
  {
    title: 'Bulk Installation',
    items: [
      { name: 'Ninite', url: 'https://ninite.com/', desc: 'Select apps, get one installer' },
      { name: 'Winget', url: 'https://learn.microsoft.com/en-us/windows/package-manager/winget/', desc: 'Windows native package manager' },
      { name: 'Chocolatey', url: 'https://chocolatey.org/', desc: 'Windows package manager' },
      { name: 'Scoop', url: 'https://scoop.sh/', desc: 'Windows package manager' }
    ]
  },
  {
    title: 'Update & Management',
    items: [
      { name: 'MacUpdater', url: 'https://macupdater.com/', desc: 'Automates scanning for outdated Mac software' },
      { name: 'Software Informer', url: 'https://software.informer.com/', desc: 'Notifies of software updates' },
      { name: 'FileHippo App Manager', url: 'https://filehippo.com/appmanager/', desc: 'Update manager' },
      { name: 'Chocolatey', url: 'https://chocolatey.org/', desc: 'Update packages via CLI' }
    ]
  },
  {
    title: 'Alternative Discovery',
    items: [
      { name: 'AlternativeTo', url: 'https://alternativeto.net/', desc: 'Crowd-sourced software recommendations' },
      { name: 'Product Hunt', url: 'https://producthunt.com/', desc: 'Discovery for new apps and tools' },
      { name: 'Slant', url: 'https://slant.co/', desc: 'Find the best software through community reviews' },
      { name: 'SimilarSites', url: 'https://similarsites.com/', desc: 'Find similar websites and apps' },
      { name: 'AppRecs', url: 'https://apprecs.com/', desc: 'App recommendations' },
      { name: 'SaasHub', url: 'https://www.saashub.com/', desc: 'SaaS product directory' }
    ]
  },
  {
    title: 'Chinese Software',
    items: [
      { name: '华军软件园', url: 'https://www.onlinedown.net/', desc: 'One of China\'s most popular IT websites' },
      { name: 'Soft98', url: 'https://soft98.ir/', desc: 'Software downloads' },
      { name: 'DownloadHa', url: 'https://www.downloadha.com/', desc: 'Software downloads' },
      { name: 'LRepacks', url: 'https://lrepacks.net/', desc: 'Software downloads' },
      { name: 'Moum', url: 'https://moum.top/en/', desc: 'Software downloads' }
    ]
  },
  {
    title: 'Regional & Language',
    items: [
      { name: 'AdslGate', url: 'https://www.adslgate.com/', desc: 'Arabic tech forum' },
      { name: 'ArabP2P', url: 'https://www.arabp2p.net/', desc: 'Arabic video/private tracker' },
      { name: 'Soft98', url: 'https://soft98.ir/', desc: 'Persian software site' },
      { name: 'Download-Ha', url: 'https://www.downloadha.com/', desc: 'Persian software site' },
      { name: 'FileCR', url: 'https://filecr.com/', desc: 'Multilingual software site' }
    ]
  },
  {
    title: 'Abandonware & Retro',
    items: [
      { name: 'WinWorld', url: 'https://winworldpc.com/', desc: 'Vintage operating systems and software' },
      { name: 'Abandonware DOS', url: 'https://www.abandonwaredos.com/', desc: 'DOS abandonware' },
      { name: 'Internet Archive Software Library', url: 'https://archive.org/details/software', desc: 'Vintage games and software' },
      { name: 'OldVersion.com', url: 'https://www.oldversion.com/', desc: 'Classic software versions' },
      { name: 'RetroSystemRevival', url: 'https://retrosystemsrevival.blogspot.com/', desc: 'Oldschool software' }
    ]
  },
  {
    title: 'Developer Repositories',
    items: [
      { name: 'GitHub', url: 'https://github.com/', desc: 'World\'s largest code repository' },
      { name: 'GitLab', url: 'https://gitlab.com/', desc: 'DevOps platform with repository' },
      { name: 'Bitbucket', url: 'https://bitbucket.org/', desc: 'Git repository management' },
      { name: 'SourceForge', url: 'https://sourceforge.net/', desc: 'Open source project hosting' },
      { name: 'Launchpad', url: 'https://launchpad.net/', desc: 'Open source collaboration platform' },
      { name: 'npm', url: 'https://npmjs.org/', desc: 'JavaScript package registry' },
      { name: 'PyPI', url: 'https://pypi.org/', desc: 'Python Package Index' },
      { name: 'RubyGems', url: 'https://rubygems.org/', desc: 'Ruby package manager' },
      { name: 'Crates.io', url: 'https://crates.io/', desc: 'Rust package registry' },
      { name: 'Packagist', url: 'https://packagist.org/', desc: 'PHP package repository' }
    ]
  },
  {
    title: 'Educational Course Software',
    items: [
      { name: 'edX', url: 'https://www.edx.org/', desc: 'Free courses' },
      { name: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu/', desc: 'Free course materials' },
      { name: 'Khan Academy', url: 'https://www.khanacademy.org/', desc: 'Free educational courses' },
      { name: 'Class Central', url: 'https://www.classcentral.com/', desc: 'Course search engine' },
      { name: 'OpenLearn', url: 'https://www.open.edu/openlearn/', desc: 'Free courses' },
      { name: 'Alison', url: 'https://alison.com/', desc: 'Free courses' },
      { name: 'Saylor Academy', url: 'https://learn.saylor.org/', desc: 'Free courses' },
      { name: 'OpenCulture', url: 'https://www.openculture.com/freeonlinecourses', desc: 'Free courses' },
      { name: 'FreeCourseSite', url: 'https://freecoursesite.com/', desc: 'Torrenting courses' },
      { name: 'AfraTafreeh', url: 'https://afratafreeh.com/', desc: 'Free courses' },
      { name: 'Course Busters', url: 'https://www.cbusters.com/home', desc: 'Course access' }
    ]
  }
];
