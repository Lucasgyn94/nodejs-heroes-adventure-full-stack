import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroService } from '../../../../core/services/hero.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnInit {
  heroForm: FormGroup;
  isEditing = false;
  heroId: string | null = null;

  heroTypes = [
    { value: 'guerreiro', label: 'Guerreiro' },
    { value: 'mago', label: 'Mago' },
    { value: 'monje', label: 'Monje' },
    { value: 'ninja', label: 'Ninja' }
  ];

  constructor(
    private fb: FormBuilder,
    private heroService: HeroService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.heroForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.min(1)]],
      type: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.heroId = this.route.snapshot.paramMap.get('id');
    if (this.heroId) {
      this.isEditing = true;
      this.loadHero();
    }
  }

  loadHero(): void {
    if (this.heroId) {
      this.heroService.getHero(this.heroId).subscribe(hero => {
        this.heroForm.patchValue(hero);
      });
    }
  }

  onSubmit(): void {
    if (this.heroForm.valid) {
      if (this.isEditing && this.heroId) {
        this.heroService.updateHero(this.heroId, this.heroForm.value)
          .subscribe(() => this.goBack());
      } else {
        this.heroService.createHero(this.heroForm.value)
          .subscribe(() => this.goBack());
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/heroes']);
  }
}
