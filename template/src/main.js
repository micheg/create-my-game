import './style.css'
import { configurator, Orientations, Types} from 'game_configurator';
import { Scene, Game } from 'phaser';

class GameScene extends Scene
{
    constructor()
    {
        super('scene-game');
    }

    create()
    {
        this.textbox = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            'Base Phaser3 Template, michelangelog.com',
            {
                color: '#FFF',
                fontFamily: 'monospace',
                fontSize: '30px'
            }
        );

        this.textbox.setOrigin(0.5, 0.5);
    }

    update(time, delta)
    {
        if (!this.textbox)
        {
            return;
        }

        this.textbox.rotation += 0.0005 * delta;
    }
}

const config = configurator(Types.MODERN, Orientations.HORIZONTAL);

config.scene = [GameScene];

window.onload = function()
{
    const area =
    {
        w: 1031, 
        h: 580
    }
    const ref = new Game(config);
    window.focus();
}
