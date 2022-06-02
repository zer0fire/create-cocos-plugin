interface Package extends NPMPackage {
  setLocalPath(localPath: string): void;

  setNextVersion(next: Next): void;

  updateNextVersion(): void;

  commitId?: string;

  next: {
    version: string;
    cocosCreator: NPMPackage["cocosCreator"];
  } | null;

  //下载链接
  npmTgzUrl: string | null;

  author: string | null;

  repository: string | undefined;

  //远端还是本地
  localPath: string | null;

  // 真实的安装是否全局安装
  isGloablInstall: boolean | null;

  readme: Promise<string> | null;

  latestVersionAvailable: boolean;
}

interface NPMPackage {
  name: string;
  description: string;
  displayName: string;
  version: string;
  cocosCreator: {
    setupMode: "all" | "global" | "local";
    useYarn: boolean;
  };
}

interface RemoteNPMPackage extends NPMPackage {
  repository?: { type: string; url: string };

  dist: {
    integrity: string;
    shasum: string;
    tarball: string;
    // "https://registry.npm.bg.huohua.cn/@huohua-game%2fcocos-assets-manager/-/cocos-assets-manager-1.1.6.tgz"
  };
  author: {
    avatar: string;
    email: string;
    name: string;
    url: string;
  };
}

interface GitlabPackage extends NPMPackage {
  author: string;
  repository: string;
  commitId: string;
  projectId: number;
}

interface CocosCreatorPackage {
  enable: boolean;
  path: string;
  info: LocalNPMPackage;
}

interface LocalNPMPackage extends NPMPackage {
  author: string;
  repository: string;
}

declare namespace electron {}

type IPCMessageCallback<T = any> = (
  this: T,
  evet: {
    reply?: (...args: any[]) => void;
  },
  ...args: any[]
) => void;

interface TemplatePackageInfo {
  useYarn: boolean;
  author: string;
  displayName: string;
  setupMode: NPMPackage["cocosCreator"]["setupMode"];
  description: string;
  name: string;
  projectName: string;
  path: string;
}
