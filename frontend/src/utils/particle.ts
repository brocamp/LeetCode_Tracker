const HeaderData = {
    fpsLimit: 100,
    interactivity: {
      detectsOn: 'canvas',
      events: {
        resize: true,
        onHover: {
          enable: false,
          mode: 'bubble',
        },
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 2,
          size: 50,
        },
      },
    },
    particles: {
      color: {
        value: [
          '#2EB6AF',
          '#2470bb',
          '#FEC73B',
          '#F89930',
          '#F45623',
          '#D62E32',
          '#EB586E',
          '#ab26ba',
        ],
      },
      move: {
        attract: {
          enable: true,
          rotate: {
            x: 600,
            y: 1200,
          },
          distance: 250,
        },
        direction: 'none',
        enable: true,
        outModes: {
          default: 'out',
        },
        random: false,
        speed: 4,
        size: true,
        straight: false,
        trail: {
          fillColor: '',
          enable: true,
          length: 3,
        },
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 27,
      },
      opacity: {
        value: 1,
      },
      shape: {
        type: ['circle', 'square'],
      },
      rotate: {
        value: 0,
        direction: 'random',
        animation: {
          enable: true,
          speed: 10,
        },
      },
      size: {
        random: {
          enable: true,
          minimumValue: 20,
        },
        animation: {
          enable: true,
          speed: 10,
          minimumValue: 30,
        },
        value: 20,
      },
    },
    detectRetina: true,
  }
  
  export default HeaderData