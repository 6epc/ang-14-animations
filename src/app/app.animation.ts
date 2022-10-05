import { animate, group, keyframes, query, state, style, transition, trigger } from '@angular/animations';

export const boxAnimation = trigger('box', [
  state('start', style({ background: 'blue' })),
  state('end', style({
    background: 'red',
    transform: 'scale(1.2)'
  })),
  state('special', style({
    background: 'orange',
    transform: 'scale(0.5)',
    borderRadius: '50%'
  })),
  transition('start => end', animate(450)),
  transition('end => start', animate('800ms ease-in-out')),
  transition('special <=> *', [
    // !NOTE after 1s we get bg green, then after 750ms we get bg black and then bg orange from state: 'special'
    group([
      query('h4', animate(1500, style({ fontSize: '0.5rem', color: 'red' }))),
      style({ background: 'green' }),
      animate(750, style({ background: 'black' })),
      animate(750)
    ])
  ]),
  // !NOTE 'void' - is reserved state; 'void => * is' the same as ':enter' '* => void' is the same as ':leave'
  transition(':enter', [
    // keyframes
    animate('4s', keyframes([
      style({ background: 'red', offset: 0.25 }), //offset is animation duration, 0.25 -> 25% -> 1s from 4s animation
      style({ background: 'black', offset: 0.5 }),
      style({ background: 'orange', offset: 0.75 }),
      style({ background: 'blue', offset: 1 }),
    ]))
    // style({ opacity: 0 }),
    // animate(500)
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    group([
      animate(1500, style({
        opacity: 0,
        transform: 'scale(1.2)'
      })),
      animate(300, style({
        color: '#000',
        fontWeight: 'bold',
        fontStyle: 'italic'
      }))
    ])
  ])
  // transition('void <=> *', animate('1s')),
])
