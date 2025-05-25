export default {
  root: ({ props }) => ({
    class: [
      // Misc
      { 'opacity-60 select-none pointer-events-none cursor-default': props.disabled },
    ],
  }),
  range: {
    class: [
      // Stroke
      'stroke-current',

      // Color
      'stroke-blue-200 dark:stroke-boxdark',

      // Fill
      'fill-none',

      // Transition
      'transition duration-100 ease-in',
    ],
  },
  value: {
    class: [
      // Animation
      'animate-dash-frame',

      // Color
      'stroke-green-400 dark:stroke-green-800',

      // Fill
      'fill-none',
    ],
  },
  label: {
    class: [
      // Text Style
      'text-center text-xl',

      // Color
      'fill-graydark dark:fill-gray',
    ],
  },
}
