public class DeliveryNoteController {
    public String getDate() {
        return '22/07/2024';
    }
    
    public String getContact() {
        return 'Jason King';
    }
    
    public String getEmail() {
        return 'logistics@harvest-tech.com.au';
    }
    
    public String getDeliveryTo() {
        return 'Inpex Operations Australia Pty Ltd, 100 St Georges Tce, Level 15 - Mail Room, PERTH WA 6000';
    }
    
    public List<Product> getProducts() {
        List<Product> products = new List<Product>();
        
        products.add(new Product('KIT0015 NS Quad Encoder Sale', '', '1 ea', ''));
        products.add(new Product('S10066 NS Quad Encoder', 'AU2225NQEX1A008', '1 ea', ''));
        products.add(new Product('10039 Jabra Speak 510', '258412026', '1 ea', ''));
        products.add(new Product('10049 Mini Displayport to HDMI Adapter', '', '1 ea', ''));
        products.add(new Product('10122 AU - IEC C13 cable', '', '2 ea', ''));
        products.add(new Product('10703 Apple 20W USB C PSU AU', '', '1 ea', ''));
        products.add(new Product('KIT0215 Harvest Control Tablet Sale', '', '1 ea', ''));
        products.add(new Product('S10038 Harvest Control Tablet', 'F9VJY7201X', '1 ea', ''));
        products.add(new Product('10735 Belkin Lightning Ethernet Adapter', '', '1 ea', ''));
        products.add(new Product('10841 Magewell Pro Capture Hexa CVBS', 'A125231102107', '1 ea', 'Installed in NQE'));
        products.add(new Product('CUSTOM Custom/Special Part', '', '1 ea', 'Magewell USB HDMI Capture'));
        products.add(new Product('KIT0045 NS Mini Sale', '', '1 ea', ''));
        products.add(new Product('10591 AC/DC 12V 40w PSU', '', '1 ea', ''));
        products.add(new Product('S10117 NS Mini', 'AU2342NSMX1A027', '1 ea', ''));
        products.add(new Product('10039 Jabra Speak 510', '214208780', '1 ea', ''));
        products.add(new Product('10031 HDMI Cable 1m', '', '1 ea', ''));
        products.add(new Product('10027 HDMI Cable 2m', '', '1 ea', ''));
        
        return products;
    }
    
    public class Product {
        public String name { get; set; }
        public String serialNumber { get; set; }
        public String qty { get; set; }
        public String notes { get; set; }
        
        public Product(String name, String serialNumber, String qty, String notes) {
            this.name = name;
            this.serialNumber = serialNumber;
            this.qty = qty;
            this.notes = notes;
        }
    }
    
    public String getGrossWeight() {
        return '15';
    }
}