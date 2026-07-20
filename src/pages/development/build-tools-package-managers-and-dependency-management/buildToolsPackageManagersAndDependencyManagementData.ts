export interface DevItem {
  name: string;
  desc: string;
  url?: string;
}

export const BUILDTOOLSPACKAGEMANAGERSANDDEPENDENCYMANAGEMENT_ITEMS: DevItem[] = [
  { name: "Maven", desc: "A build automation tool primarily for Java projects.", url: "https://maven.apache.org/" },
  { name: "Gradle", desc: "A flexible build automation tool used for Java, Android, and more.", url: "https://gradle.org/" },
  { name: "npm", desc: "The default package manager for Node.js.", url: "https://www.npmjs.com/" },
  { name: "Yarn", desc: "A fast, secure, and reliable package manager for JavaScript.", url: "https://yarnpkg.com/" },
  { name: "pnpm", desc: "A fast, disk-space-efficient package manager for JavaScript.", url: "https://pnpm.io/" },
  { name: "pip", desc: "The package installer for Python.", url: "https://pypi.org/project/pip/" },
  { name: "Homebrew", desc: "A popular package manager for macOS.", url: "https://brew.sh/" },
  { name: "Cargo", desc: "The Rust package manager and build system.", url: "https://doc.rust-lang.org/cargo/" },
  { name: "apt (Advanced Package Tool)", desc: "A package manager for Debian-based Linux distributions.", url: "https://wiki.debian.org/Apt" },
  { name: "Chocolatey", desc: "A package manager for Windows (also in the Installation Tools category).", url: "https://chocolatey.org/" },
  { name: "Poetry", desc: "A dependency management and packaging tool for Python.", url: "https://python-poetry.org/" },
  { name: "Conda", desc: "A package and environment manager for data science.", url: "https://docs.conda.io/" },
  { name: "Go Modules", desc: "The official dependency management system for Go.", url: "https://go.dev/ref/mod" },
  { name: "RubyGems", desc: "The package manager for Ruby.", url: "https://rubygems.org/" },
  { name: "Composer", desc: "The dependency manager for PHP.", url: "https://getcomposer.org/" },
  { name: "NuGet", desc: "The package manager for .NET.", url: "https://www.nuget.org/" },
  { name: "Cabal", desc: "The build system for Haskell.", url: "https://www.haskell.org/cabal/" },
  { name: "Stack", desc: "A cross-platform build tool for Haskell.", url: "https://docs.haskellstack.org/" },
  { name: "Rake", desc: "A build tool for Ruby.", url: "https://ruby.github.io/rake/" },
  { name: "Bazel", desc: "A fast, scalable, multi-language build system from Google.", url: "https://bazel.build/" },
  { name: "Buck", desc: "A build system from Meta.", url: "https://buck.build/" },
  { name: "Pants", desc: "A scalable build system for monorepos.", url: "https://www.pantsbuild.org/" },
  { name: "Please", desc: "A cross-language build system with a focus on correctness.", url: "https://please.build/" },
  { name: "Earthly", desc: "A build tool that uses a Docker-like syntax.", url: "https://earthly.dev/" },
  { name: "CMake", desc: "A cross-platform build system generator.", url: "https://cmake.org/" },
  { name: "Make", desc: "A build automation tool.", url: "https://www.gnu.org/software/make/" },
  { name: "Meson", desc: "An open-source build system designed for speed and ease of use.", url: "https://mesonbuild.com/" },
];
