import { Test, TestingModule } from '@nestjs/testing';
import { ContactFactoryService } from './contact-factory.service';

const MOCK_CONTACT = {
  name: 'John Doe',
  email: 'a@a.com',
  phone: '1234567890',
};

describe('ContactFactoryService', () => {
  let service: ContactFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [ContactFactoryService],
    }).compile();

    service = module.get<ContactFactoryService>(ContactFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should map a new contact', () => {
    // expected
    const expected = {
      ...MOCK_CONTACT,
      userId: '11',
    };

    // actual
    const actual = service.createNewContact(MOCK_CONTACT, expected.userId);

    // assert
    expect(actual).toEqual(expected);
  });

  it('should map a update contact', () => {
    // expected
    const expected = {
      ...MOCK_CONTACT,
    };

    // actual
    const actual = service.updateContact(MOCK_CONTACT);

    // assert
    expect(actual).toEqual(expected);
  });
});
