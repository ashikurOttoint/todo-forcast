const deviceSize = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '525px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

const devices = {
  mobileS: `(min-width: ${deviceSize.mobileS})`,
  mobileM: `(min-width: ${deviceSize.mobileM})`,
  mobileL: `(min-width: ${deviceSize.mobileL})`,
  tablet: `(min-width: ${deviceSize.tablet})`,
  laptop: `(min-width: ${deviceSize.laptop})`,
  laptopL: `(min-width: ${deviceSize.laptopL})`,
  desktop: `(min-width: ${deviceSize.desktop})`,
  desktopL: `(min-width: ${deviceSize.desktop})`,
};

export default devices;