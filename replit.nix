{ pkgs }: {
  deps = [
    pkgs.nodejs-18_x
    pkgs.nodePackages.typescript-language-server
    pkgs.nodePackages.npm
    pkgs.git
    pkgs.replitPackages.jest
  ];
  env = {
    PATH = "${pkgs.nodejs-18_x}/bin:${pkgs.nodePackages.npm}/bin:./node_modules/.bin:$PATH";
    LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
      pkgs.libuuid
    ];
    NODE_ENV = "production";
    NPM_CONFIG_PREFIX = "$HOME/.npm-global";
    NPM_CONFIG_ENGINE_STRICT = "false";
  };
}