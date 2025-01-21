{ pkgs }: {
  deps = [
    pkgs.nodejs-18_16_x
    pkgs.nodePackages.typescript-language-server
    pkgs.yarn
    pkgs.nodePackages.npm
    pkgs.git
    pkgs.replitPackages.jest
  ];
  env = {
    LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
      pkgs.libuuid
    ];
  };
} 