import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { AuthenticationService } from '../../../services/authentication.service';
import { ClosetService } from '../../../services/closet.service';
import { SearchFilterPipe } from '../../../pipes/search-filter.pipe';
import { ClosetCardComponent } from '../../page-partial/closet-card/closet-card.component';
import { ClosetManageComponent } from './closet-manage.component';
import {
  MockDashboardComponent
} from '../../../../test/components';
import {
  ClosetServiceMock,
  AuthenticationServiceMock
} from '../../../../test/services';
import {
  mockUserOne,
  mockClosetList,
  mockSearchFilterPipeParams
} from '../../../../test/objects';
import {
  SearchFilterPipeMock
} from '../../../../test/pipes';
import {
  inputDispatch,
  inputDispatchAndCount,
  inputDispatchAndCheckArgs,
  clickBackAndTestNavigate,
  clickAndTestCalledWithMult,
  clickTest
} from '../../../../test/utils';
import {
  editButtonTests
} from '../../../../test/common-tests';

const closetList = mockClosetList;
const currentUser = mockUserOne;

describe('ClosetManageComponent', () => {
  let component: ClosetManageComponent;
  let fixture: ComponentFixture<ClosetManageComponent>;
  let authenticationService: AuthenticationServiceMock;
  let closetService: ClosetServiceMock;
  let searchFilterPipe;
  let router: Router;
  let hostElement;
  let closetCardList;

  const routes = [
    { path: 'dashboard', component: MockDashboardComponent}
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        FormsModule,
        SharedModule
      ],
      declarations: [
        ClosetCardComponent,
        ClosetManageComponent,
        SearchFilterPipeMock,
        MockDashboardComponent
      ],
      providers: [
        ClosetManageComponent,
        {provide: ClosetService, useClass: ClosetServiceMock},
        {provide: AuthenticationService, useClass: AuthenticationServiceMock},
        {provide: SearchFilterPipe, useClass: SearchFilterPipeMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosetManageComponent);
    component = fixture.debugElement.componentInstance;
    authenticationService = TestBed.get(AuthenticationService);
    closetService = TestBed.get(ClosetService);
    router = TestBed.get(Router);
    spyOn(component, 'getAllClothes').and.callThrough();
    spyOn(component, 'toggleEditMode').and.callThrough();
    spyOn(component, 'save').and.callThrough();
    spyOn(component, 'removeClothing').and.callThrough();
    spyOn(closetService, 'getAllClothes').and.callThrough();
    spyOn(closetService, 'removeClothing').and.callThrough();
    spyOn(router, 'navigate');
    hostElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should navigate to dashboard component when
    back button is clicked`, () => {
    clickBackAndTestNavigate(hostElement, router, '/dashboard', fixture);
  });

  describe(`when removeClothing function is called`, () => {
    beforeEach(() => {
      component.removeClothing('1');
      fixture.detectChanges();
    });
    it(`should call closetService's removeClothing method
    with clothing id.`, () => {
      expect(closetService.removeClothing).toHaveBeenCalledWith('1');
    });
    it(`should call closetService's getAllClothes method
    after recieving data from removeClothing`, () => {
      expect(component.getAllClothes).toHaveBeenCalledTimes(2);
    });
  });

  describe(`when user types input in the search bar,`, () => {
    let searchInput: HTMLInputElement;
    beforeEach(() => {
      component.ngOnInit();
      searchInput = hostElement.querySelector('#search-input input');
    });
    it(`should call search filter with searchText and
      the clothingName string as property.`, () => {
      searchFilterPipe = spyOn(SearchFilterPipeMock.prototype, 'transform');
      inputDispatchAndCheckArgs(searchInput, 'shirt',
        mockSearchFilterPipeParams, searchFilterPipe, fixture);
    });
    it(`should render changed results into closet card
      components.`, () => {
      inputDispatchAndCount(searchInput, 'shirt', hostElement,
        '.closet-card-item', 1, fixture);
    });
  });

  describe(`when edit button is clicked,`, () => {
    beforeEach(() => editButtonTests(component, fixture, hostElement));
  });

  describe(`from the init method,`, () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    });
    it(`should retrieve the current user from the
      authentication service.`, () => {
      expect(component.currentUser).toEqual(currentUser);
    });
    it(`should call the getAllClothes method, and
      set the closetList from it.`, () => {
      expect(component.getAllClothes).toHaveBeenCalled();
      expect(closetService.getAllClothes).toHaveBeenCalledWith(currentUser);
      expect(component.closetList).toEqual(closetList);
    });
    it(`should render each item in the closetList
      into closet card components`, () => {
      let closetCardList = hostElement.querySelectorAll('.closet-card-item');
      expect(closetCardList.length).toEqual(closetList.length);
    });
    it(`should have editMode as false.`, () => {
      expect(component.editMode).toBeFalsy();
    })
  });
});
