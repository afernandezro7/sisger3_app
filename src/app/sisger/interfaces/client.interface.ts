export interface Client {
    id:           number;
    user:         number | null;
    firstName:    string | null;
    lastName:     string | null;
    phones:       string | null;
    email:        string | null;
    createdAt:    Date  | null;
    dni:          string | null;
    passport:     string | null;
    address:      string | null;
    municipality: string | null;
    province:     string | null;
    country:      string | null;
    cell:         string | null;
}