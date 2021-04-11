// Here are the lists

export const oscarList = [
  556678,
  556984,
  560050,
  566076,
  575813,
  577922,
  580175,
  581032,
  581734,
  653756,
  661914,
  667869,
  669363,
  618363,
  682110,
  728118,
  337401,
  413518,
  422803,
  441130,
  502033,
  508439,
  508442,
  508570,
  516486,
  531454,
  740985,
  581859,
  582014,
  583406,
  590223,
  592984,
  600354,
  614560,
  614911,
  615643,
  615667,
  628534,
  641662,
  653725,
  653729,
];

export const shortsList = [
  663343,
  750249,
  713776,
  663881,
  757697,
  655154,
  776751,
  741845,
  747059,
  631344,
  675235,
  787428,
  678801,
  762632,
  689676,
];

export const predictList = [
  441130,
  464052,
  500840,
  501738,
  502033,
  506281,
  508439,
  508442,
  539529,
  556984,
  558582,
  560050,
  568467,
  575417,
  577922,
  580175,
  581032,
  581734,
  581859,
  582014,
  582927,
  583406,
  587792,
  592984,
  595671,
  599960,
  600354,
  611213,
  614560,
  614911,
  615643,
  615667,
  628534,
  641662,
  644583,
  653574,
  653579,
  653723,
  653725,
  653727,
  653746,
  653762,
  654170,
  659967,
  661914,
  664601,
  667869,
  675485,
  618363,
  683127,
  727705,
  728928,
  739246,
  740985,
];

export const globesList = [
  586101,
  502033,
  582014,
  508442,
  441130,
  501979,
  621744,
  614911,
  661914,
  566076,
  740985,
  641662,
  611213,
  600354,
  520900,
  592984,
  581032,
  556574,
  556984,
  529203,
  602269,
  667869,
  581734,
  599960,
  577922,
  560050,
  583406,
  644583,
  508439,
  615667,
  587792,
  575417,
  615643,
  601666,
  617708,
  614560,
  580175,
  556678,
];

export const fiftyList = [
  582014,
  545237,
  675485,
  654170,
  565743,
  446159,
  726041,
  556984,
  605437,
  517148,
  522369,
  581032,
  468592,
  522373,
  504582,
  570670,
  575417,
  577922,
  661914,
  502033,
  615643,
  441130,
  508442,
  664297,
  740985,
  605437,
  575774,
  615761,
  587792,
  547017,
  581734,
  580175,
  435615,
  627463,
  615667,
  500840,
  573081,
  595671,
  618363,
  653574,
  623856,
  581859,
  541305,
  556678,
  558582,
  568467,
  614560,
  653729,
];

export const spiritsList = [
  446159,
  502033,
  530723,
  558582,
  558582,
  570670,
  581734,
  582014,
  587792,
  595671,
  595940,
  597219,
  599960,
  604031,
  607430,
  615643,
  615667,
  620897,
  627463,
  628534,
  653574,
  653594,
  653668,
  653725,
  653756,
  660958,
  664297,
  665888,
  666271,
  618363,
  727002,
  728116,
  728118,
  653729,
];

export const sagList = [
  581032,
  582014,
  556984,
  614560,
  581859,
  602269,
  502033,
  600354,
  464052,
  615643,
  615667,
  740985,
  592984,
  641662,
  337401,
  661914,
  583406,
  581734,
];

export const baftaList = [
  556984,
  748340,
  441130,
  656690,
  678801,
  793679,
  508570,
  614911,
  644583,
  620897,
  715369,
  628534,
  600354,
  653746,
  611640,
  577922,
  502033,
  508442,
  575776,
  575417,
  505379,
  728118,
  728118,
  582014,
  413518,
  641662,
  508439,
  661914,
  581734,
  581032,
  682110,
  337401,
  665764,
  618228,
  755310,
  615643,
  614560,
  615667,
  754623,
  751148,
  583755,
  586863,
  583406,
  575774,
  592984,
  516486,
  730527,
  556678,
  587609,
  664280,
  581859,
  623238,
  618363,
  565307,
  574396,
  740985,
  522098,
  580175,
  568467,
];

const unionAll = [oscarList, globesList, sagList];
export const unionList = unionAll.reduce((a, b) =>
  a.filter((c) => b.includes(c))
);
