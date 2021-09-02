import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

<<<<<<< HEAD
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

=======
import { UntilDestroy } from '@ngneat/until-destroy';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
import { navigateGo } from 'src/app/store/actions/router.actions';
import { showAlert } from 'src/app/store/actions/application.actions';
import { fetchCreateActivityCategory } from 'src/app/store/actions/activity.actions';
import { getKeepedActivities } from 'src/app/store/selectors/activity.selectors';
import { ActivityListPage } from 'src/app/modals/activities/activity-list/activity-list.page';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-create-activity-category',
  templateUrl: './create-activity-category.page.html',
  styleUrls: ['./create-activity-category.page.scss'],
})
export class CreateActivityCategoryPage implements OnInit {
  public categoryName: string;
  private keepedActivitiesLength: number;
  private keepedActivitiesSubscription: Subscription;

  constructor(private store: Store, private modalController: ModalController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.keepedActivitiesSubscription= this.store.select(getKeepedActivities).subscribe(res => {
      this.keepedActivitiesLength= res.length;
    });
  }

<<<<<<< HEAD
  ionViewWillLeave() {
    this.keepedActivitiesSubscription && this.keepedActivitiesSubscription.unsubscribe();
  }

=======
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
  onSubmit() {
    if (!this.categoryName || !this.categoryName.trim()) {
      this.store.dispatch(
        showAlert({
          options: {
            message: 'Nama kategori tidak boleh kosong!',
            buttons: ['OK']
          }
        })
      );
    } else {
      if (this.keepedActivitiesLength === 0) {
        this.store.dispatch(fetchCreateActivityCategory({ fields: { category: this.categoryName } }));
        this.store.dispatch(navigateGo({ path: ['settings/activities'] }));
        this.categoryName= '';
      } else {
        this.store.dispatch(
          showAlert({
            options: {
              message: 'Apakah anda ingin memindahkan aktivitas ke dalam kategori ini?',
              buttons: [
                {
                  text: 'Ya, pindahkan',
                  handler: async () => {
                    const modal= await this.modalController.create({ component: ActivityListPage });
                    modal.present();
      
                    const { data }= await modal.onWillDismiss();
                    if (data && data.activities) {
                      this.store.dispatch(fetchCreateActivityCategory({ fields: { category: this.categoryName, activities: data.activities } }));
                      this.store.dispatch(navigateGo({ path: ['settings/activities'] }));
                      this.categoryName= '';
                    }
                  }
                },
                {
                text: 'Tidak',
                  handler: () => {
                    this.store.dispatch(fetchCreateActivityCategory({ fields: { category: this.categoryName } }));
                    this.store.dispatch(navigateGo({ path: ['settings/activities'] }));
                    this.categoryName= '';
                  }
                }
              ]
            }
          })
        );
      }
    }
  }
}
