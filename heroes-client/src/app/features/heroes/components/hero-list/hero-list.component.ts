import { Component, OnInit } from '@angular/core';
import {Hero} from '../../../../core/models/hero.model'
import { HeroService } from 'src/app/core/services/hero.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadHeroes();
  }

  loadHeroes(): void {
    this.heroService.getHeroes().subscribe(
      heroes => this.heroes = heroes
    );
  }
  navigateToCreate(): void {
    this.router.navigate(['/heroes/new']);
  }

  navigateToEdit(id: string | undefined): void{
    if (id) {
      this.router.navigate(['/heroes/edit', id]);
    }
  }

  deleteHero(id:string | undefined): void {
    if (id && confirm('Você tem certeza que deseja deletar esse herói?')) {
      this.heroService.deteleHero(id).subscribe(() => {
        this.loadHeroes();
      })
    }
  }
}
