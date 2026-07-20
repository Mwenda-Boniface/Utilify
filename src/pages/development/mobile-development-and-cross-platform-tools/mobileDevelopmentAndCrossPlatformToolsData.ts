export interface DevItem {
  name: string;
  desc: string;
  url?: string;
}

export const MOBILEDEVELOPMENTANDCROSSPLATFORMTOOLS_ITEMS: DevItem[] = [
  { name: "Android Studio", desc: "The official IDE for Android development.", url: "https://developer.android.com/studio" },
  { name: "Xcode", desc: "The official IDE for iOS/macOS development.", url: "https://developer.apple.com/xcode/" },
  { name: "Flutter", desc: "Google's UI toolkit for building natively compiled apps from a single codebase.", url: "https://flutter.dev/" },
  { name: "React Native", desc: "A framework for building native apps using React.", url: "https://reactnative.dev/" },
  { name: "Ionic", desc: "An open-source UI toolkit for building cross-platform mobile apps.", url: "https://ionicframework.com/" },
  { name: "NativeScript", desc: "A framework for building cross-platform mobile apps with JavaScript.", url: "https://nativescript.org/" },
  { name: "Cordova", desc: "A platform for building mobile apps with HTML, CSS and JS.", url: "https://cordova.apache.org/" },
  { name: "Capacitor", desc: "A cross-platform app runtime for building web apps for mobile.", url: "https://capacitorjs.com/" },
  { name: "Expo", desc: "A framework and platform for universal React applications.", url: "https://expo.dev/" },
  { name: "Kotlin Multiplatform", desc: "A technology for cross-platform development.", url: "https://kotlinlang.org/docs/multiplatform.html" },
  { name: ".NET MAUI", desc: "A cross-platform framework for creating mobile and desktop apps with C#.", url: "https://dotnet.microsoft.com/en-us/apps/maui" },
  { name: "Xamarin", desc: "A Microsoft framework for building iOS, Android, and Windows apps with .NET.", url: "https://dotnet.microsoft.com/en-us/apps/xamarin" },
  { name: "SwiftUI", desc: "A UI framework for building apps for Apple platforms.", url: "https://developer.apple.com/xcode/swiftui/" },
  { name: "Jetpack Compose", desc: "A modern UI toolkit for building native Android apps.", url: "https://developer.android.com/jetpack/compose" },
];
