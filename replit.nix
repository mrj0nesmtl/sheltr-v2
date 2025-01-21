{ pkgs }: {
  deps = [
    pkgs.nodejs-18_19
    pkgs.nodePackages.typescript-language-server
    pkgs.yarn
    pkgs.nodePackages.npm
    pkgs.git
    pkgs.replitPackages.jest
  ];
  env = {
    PATH = "${pkgs.nodejs-18_19}/bin:${pkgs.nodePackages.npm}/bin:$PATH";
    LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
      pkgs.libuuid
    ];
  };
} 