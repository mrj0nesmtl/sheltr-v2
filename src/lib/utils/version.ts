interface VersionConfig {
  major: number;
  minor: number;
  patch: number;
  beta: boolean;
  buildNumber: number;
}

export const currentVersion: VersionConfig = {
  major: 0,
  minor: 9,
  patch: 2,
  beta: true,
  buildNumber: process.env.GITHUB_RUN_NUMBER || 0
};

export const getVersionString = (): string => {
  const { major, minor, patch, beta } = currentVersion;
  return `${major}.${minor}.${patch}${beta ? '-beta' : ''}`;
}; 