import Alpine from 'alpinejs';
import { BaseController } from './controller';
import { endgameDatabaseService, redrawIconImages, routeService } from '../services';
import { EndgameDatabase } from '../model';
import { ariaDescriptionFromIcon, clone } from '../commons';
import { settingsController } from './settings';

class AppController extends BaseController {
    onEnter(_$routeParams?: any): void {
        Alpine.data('info', () => ({
            categories: clone(endgameDatabaseService.endgameDatabase.categories),
            categorySelected: '',
            selectCategory(category: string) {
                if (this.categorySelected != category) {
                    this.categorySelected = category;
                    this.$nextTick().then(() => { routeService.updatePageLinks(); });
                } else {
                    this.categorySelected = '';
                }
            },
            ariaDescriptionFromIcon: ariaDescriptionFromIcon,
            showSettings() {
                routeService.openModal('settings', 'settings.html', settingsController, true, false);
            },
            init() {
                endgameDatabaseService.endgameDatabaseChangedEmitter.addEventListener((database: EndgameDatabase) => {
                    this.categories = clone(database.categories);
                });
                ['categorySelected'].forEach((item) => {
                    this.$watch(item, (_value) => {
                        redrawIconImages();
                    });
                });
            }
        }));
    }
}

export const appController = new AppController();
