import React from 'react'
import musteri from '../../assets/musteri.jpg';
import anahtar from '../../assets/anahtar.jpg';
import './About.css';

type Props = {}

const AboutUs = (props: Props) => {
    return (
        <div className="rent-a-car-page">
            <div className='hakkimizda'>
                <h2>HAKKIMIZDA</h2> <br />
                <p>ExtendRent, şehrinizin güvenilir ve samimi araç kiralama hizmeti sağlayıcısıdır. 2022 yılından beri sektörde liderliği ve müşteri memnuniyetini ön planda tutan yaklaşımıyla hizmet veren firmamız, müşterilerimize rahat ve konforlu bir seyahat deneyimi sunmayı amaçlamaktadır.

                    Müşterilerimizin ihtiyaçlarını anlamak ve onlara en uygun araçları sunmak için çaba gösteriyoruz. Geniş araç filomuz ve uygun fiyat politikamızla müşterilerimizin her türlü talebini karşılamak için buradayız.

                    Ekibimizdeki deneyimli ve uzman personelimiz, her adımda müşterilerimize yardımcı olmak ve onların seyahatlerini sorunsuz hale getirmek için çalışıyor. Müşteri memnuniyetini en üst düzeyde tutarak, ExtendRent olarak müşterilerimize güvenilir, kaliteli ve ekonomik bir araç kiralama deneyimi sunuyoruz.

                    Siz de ExtendRent'ın ayrıcalıklı hizmetlerinden yararlanmak ve konforlu bir seyahat deneyimi yaşamak için bize bugün katılın. İhtiyacınız olan aracı seçin ve güvenle yolculuğa çıkın.

                    ExtendRent olarak, sizin güvenliğiniz ve memnuniyetiniz bizim önceliğimizdir. İyi yolculuklar dileriz! </p>
            </div> <br /> <br />
            <div className="row">
                <div className="left-column left1">
                    <img className='carImage car1' src={musteri} alt='car-image' />
                </div>
                <div className="right-column">
                    <h4>MİSYONUMUZ</h4>
                    <p>
                        Misyonumuz, müşterilerimize güvenilir, uygun fiyatlı ve kaliteli araç kiralama hizmetleri sunarak seyahatlerini kolaylaştırmak ve memnuniyetlerini en üst düzeye çıkarmaktır. Küçük bir aile şirketi olarak, her müşterimizi özel hissettirmek ve ihtiyaçlarına özenle yanıt vermek en önemli önceliğimizdir. </p> <br />

                    <h4>VİZYONUMUZ</h4>
                    <p>
                        Vizyonumuz, Rent A Car olarak müşterilerimizin seyahat deneyimlerini iyileştirmek ve onlara en iyi hizmeti sunmak için sürekli olarak çaba göstermektir. Tek şubemizle başladık, ancak gelecekte daha fazla şube açarak daha geniş bir müşteri kitlesine ulaşmayı hedefliyoruz. Sektördeki yeniliklere açık olup, teknolojiyi kullanarak hizmet kalitemizi artırmak istiyoruz.
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="left-column">
                    <h4>DEĞERLERİMİZ</h4>
                    <p>Müşteri Memnuniyeti: Her zaman müşterilerimizin memnuniyetini ön planda tutuyoruz.
                        Güvenilirlik: Müşterilerimize güvenilir ve dürüst hizmet sunmaya özen gösteriyoruz.
                        Esneklik: Müşterilerimizin taleplerine esnek bir şekilde yanıt veriyoruz ve onların ihtiyaçlarına uygun çözümler sunuyoruz.
                        Toplumsal Sorumluluk: Topluma ve çevreye duyarlı bir şekilde faaliyet göstermeyi ve yerel topluluklara destek olmayı önemsiyoruz.
                        ExtendRent olarak, tek şubemizde dahi müşterilerimize en iyi hizmeti sunmaya kararlıyız. Her müşterimizle samimi bir ilişki kurmayı ve onların seyahatlerini kolaylaştırmayı amaçlıyoruz.</p>
                </div>
                <div className="right-column right1">
                    <img className='carImage car2' src={anahtar} alt='car-image' />
                </div>
            </div>
        </div>
    );
}

export default AboutUs