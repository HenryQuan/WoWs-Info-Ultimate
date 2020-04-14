import 'package:flutter/material.dart';
import 'package:wowsinfo/core/models/Wiki/WikiWarship.dart' as Wiki;

/// WikiWarShipInfoPage class
class WikiWarShipInfoPage extends StatefulWidget {
  final Wiki.Warship ship;
  WikiWarShipInfoPage({Key key, @required this.ship}) : super(key: key);

  @override
  _WikiWarShipInfoPageState createState() => _WikiWarShipInfoPageState();
}

class _WikiWarShipInfoPageState extends State<WikiWarShipInfoPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.ship.shipIdAndIdStr)
      ),
      body: Center(
        child: Column(
          children: [
            Hero(
              tag: widget.ship.shipId,
              child: Image(
                image: NetworkImage(widget.ship.smallImage), 
              ),
            ),
          ],
        ),
      ),
    );
  }
}
