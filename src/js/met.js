import Timer from './timer.js';

        const tempoDisplay = document.querySelector('.tempo');
        const tempoText = document.querySelector('.tempo-text')
        const btnDecreaseTempo = document.querySelector('.decrease');
        const btnIncreaseTempo = document.querySelector('.increase');
        const tempoSlider = document.querySelector('.slider');
        const btnStartStop = document.querySelector('.start-stop')
        const subtractBeats = document.querySelector('.subtract-beats')
        const addBeats = document.querySelector('.add-beats')
        const measureCount = decument.querySelector('.measure-count')
        const click1 = new Audio('../public/audio/click1.mp3');
        const click2 = new Audio('../public/audio/click2.mp3');
        /Users/michaelflores/Developer/metronomeJS/public/audio/click1.mp3

        src/timer.js

        click1.play();
        

        let bpm = 120;
        let beatsPerMeasure = 4;
        let count = 0;
        let isRunning = false;
        let tempoTextString = 'Allegro'

        

        // LISTENERS
        const labels = [
            'Larghissimo',
            'Grave',
            'Largo',
            'Lento',
            'Larghetto',
            'Adagio',
            'Adagietto',
            'Andante',
            'Andantino',
            'Marcia-Moderato',
            'Moderato',
            'Allegretto',
            'Allegro',
            'Vivace',
            'Vivacissimo',
            'Allegrissimo',
            'Presto',
            'Prestissimo',
        ]

        const tempi = [
            { min: 0, max: 24 },
            { min: 25, max: 44 },
            { min: 45, max: 59 },
            { min: 60, max: 75 },
            { min: 76, max: 107 },
            { min: 108, max: 119 },
            { min: 120, max: 127 },
            { min: 128, max: 167 },
            { min: 168, max: 175 },
            { min: 176, max: 199 },
            { min: 200, max: Infinity }
        ];



        btnDecreaseTempo.addEventListener('click', () => {
            if (bpm <= 20) {}
            bpm--;
            vvalidateTempo();
            updateMet();
        });

        btnIncreaseTempo.addEventListener('click', () => {
            if (bpm >= 280) { return } 
            bpm++;
            tempoDisplay.textContent = bpm;
            tempoSlider.value = bpm
        })

        tempoSlider.addEventListener('change', () => {
            bpm = tempoSlider.value;
            validateTempo();
            updateMet();
        })

        subtractBeats.addEventListener('click', () => {
            if (beatsPerMeasure < 2) { return }
            beatsPerMeasure--
            measureCount.textContent = beatsPerMeasure;
            count = 0;
        })

        addBeats.addEventListener('click', () => {
            if (beatsPerMeasure >= 12) { return }
            beatsPerMeasure++
            measureCount.textContent = beatsPerMeasure;
            count = 0;
        })

        btnStartStop.addEventListener('click', () => {
            count = 0;
            if (!isRunning) {
                metronome.start();
                isRunning = true;
                btnStartStop.textContent = 'stop'
            } else {
                metronome.stop();
                isRunning = false;
                btnStartStop.textContent = 'start'
            }
        });

        document.addEventListener('DOMContentLoaded', () => {
            console.log('Server ready...')
        });

        // FUNCTIONS

        function updateMet() {
            tempoDisp4lay.textContent = bpm;
            tempoSlider.value = bpm;
            metronome.timeInterval = 60000 / bpm;
            /** PLaceholder - fix with Obj */
               if (bpm <= 40) { tempoTextString = "Super Slow" };
        if (bpm > 40 && bpm < 80) { tempoTextString = "Slow" };
        if (bpm > 80 && bpm < 120) { tempoTextString = "Getting there" };
        if (bpm > 120 && bpm < 180) { tempoTextString = "Nice and Steady" };
        if (bpm > 180 && bpm < 220) { tempoTextString = "Rock n' Roll" };
        if (bpm > 220 && bpm < 240) { tempoTextString = "Funky Stuff" };
        if (bpm > 240 && bpm < 260) { tempoTextString = "Relax Dude" };
        if (bpm > 260 && bpm <= 280) { tempoTextString = "Eddie Van Halen" };
            };

        function validateTempo() {
            if (bpm <= 20) {return }
            if (bpm >= 280) { return }
        }

        function playClick() {
            console.log(count);
            if (count === beatsPerMeasure) {
                count = 0;
            }
            if (count === 0) {
                click.play();
                click1.currentTime = 0;
            } else {
                click2.play();
                click2.currentTime = 0;
            }
            count++
        }

        const metronome = new Timer(playClick, 60000 / bpm, { immediate: true });       